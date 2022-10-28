const AppError = require("../../../../FoodExplorer_BackEnd/src/utils/AppError");
const knex = require("../database/knex");

class DishsController {
   async create(request, response) {
      const { title, description, price, img, adm, ingredients } = request.body;
      const user_id = request.user.id

      const dish_id = await knex("dishs").insert({
         title,
         description,
         price,
         img,
         adm,
         user_id
      });

      const ingredientsInsert = ingredients.map(name => {
         return {
            dish_id,
            name,
            user_id
         } 
      });

      await knex("ingredients").insert(ingredientsInsert);

      return response.status(201).json();
   }

   async update(request, response) {
      const { title, description, price, img, ingredients } = request.body;
      const { id } = request.params;

      const dishs = await knex("dishs").where({ id }).first();

      if(!dishs) {
         throw new AppError("O prato que você está tentando atualizar não existe!")
      }
      // comparar campos do banco com o que é preciso atualizar
      dishs.title = title ?? dishs.title;
      dishs.description = description ?? dishs.description;
      dishs.img = img ?? dishs.img;
      dishs.price = price ?? dishs.price;
      
      const checkOnlyOneIngredient = typeof(ingredients) === "string";

        let ingredientsInsert
        if (checkOnlyOneIngredient) {
          ingredientsInsert = {
            dish_id: dishs.id,
            name: ingredients
          }
        } else if (ingredients.length >= 1) {
          ingredientsInsert = ingredients.map(ingredient => {
            return {
              dish_id: dishs.id,
              name : ingredient
            }
          })

          await knex("ingredients").where({ dish_id: id}).insert(ingredientsInsert)

         }   

     return response.status(201).json("Prato atualizado com sucesso!")    
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("dishs").where({ id }).delete();

      return response.json();
   }

   async index(request, response) {
      const { title, user_id, ingredients } = request.query;
      let dishs;

      if (ingredients) {
         const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

         dishs = await knex("ingredients")
         .select([
            "dishs.id",
            "dishs.title",
            "dishs.user_id"
         ])
         .where("dishs.user_id", user_id )
         .whereLike("dishs.title", `%${title}%`)
         .whereIn("name", filterIngredients)
         .innerJoin("dishs", "dishs.id", "ingredients.dish_id")
         .orderBy("dishs.title")

      } else {
         dishs = await knex("dishs")
         .where({ user_id })
         .whereLike("title", `%${title}%`)
         .orderBy("title")
      }

      const userIngredients = await knex("ingredients").where({ user_id });
      const dishsWithIngredients = dishs.map(dish => {
         const dishIngredients = userIngredients.filter(ingredients => ingredients.dish_id === dish.id);

         return {
            ...dish,
            ingredients: dishIngredients
         }
      });

      return response.json(dishsWithIngredients);
   }
}

module.exports = DishsController;