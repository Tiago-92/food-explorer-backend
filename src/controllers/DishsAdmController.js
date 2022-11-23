const AppError = require("../../../../FoodExplorer_BackEnd/src/utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

 class DishsAdmController {
   async create(request, response) {
      const { title, description, price, adm, ingredients } = request.body;
      const user_id = request.user.id
      const imageFilename = request.file.filename;

      const diskStorage = new DiskStorage();

      const filename = await diskStorage.saveFile(imageFilename);

      const dish_id = await knex("dishs").insert({
         title,
         description,
         price,
         img: filename,
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
        } else if (ingredients.length > 1) {
          ingredientsInsert = ingredients.map(ingredient => {
            return {
              dish_id: dishs.id,
              name : ingredient
            }
          })
          // estudando uma forma de usar updtate, pessoal da Rocket, me da uma luz?? kkkk
          await knex("ingredients").where({ dish_id: id}).delete(ingredientsInsert)
          await knex("ingredients").where({ dish_id: id}).insert(ingredientsInsert)
         }   

     return response.status(201).json("Prato atualizado com sucesso!")    
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("dishs").where({ id }).delete();

      return response.json();
   }
 }
 
 module.exports = DishsAdmController;