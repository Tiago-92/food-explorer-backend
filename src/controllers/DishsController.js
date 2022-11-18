const AppError = require("../../../../FoodExplorer_BackEnd/src/utils/AppError");
const knex = require("../database/knex");

class DishsController {
   
   async index(request, response) {
      const { title, ingredients } = request.query;
      let dishs;

      if (ingredients) {
         const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());

         dishs = await knex("ingredients")
         .select([
            "dishs.id",
            "dishs.title",
            "dishs.price",
            
         ])
         .whereLike("dishs.title", `%${title}%`)
         .whereIn("name", filterIngredients)
         .innerJoin("dishs", "dishs.id", "ingredients.dish_id")
         .orderBy("dishs.title")

      } else {
         dishs = await knex("dishs")
         .whereLike("title", `%${title}%`)
         .orderBy("title")
      }

      const dishesIngredients = await knex("ingredients")
      const dishsWithIngredients = dishs.map(dish => {
         const dishIngredients = dishesIngredients.filter(ingredients => ingredients.dish_id === dish.id);

         return {
            ...dish,
            ingredients: dishIngredients
         }
      });

      return response.json(dishsWithIngredients);
   }

   async show (request, response) {
      const { id } = request.params;

      const data = await knex("dishs").where({ id }).first();

      return response.json({ data });
  }
}

module.exports = DishsController;