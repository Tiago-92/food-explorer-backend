const AppError = require("../../../../FoodExplorer_BackEnd/src/utils/AppError");
const knex = require("../database/knex");

class DishsController {
   
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