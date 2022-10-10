const knex = require("../database/knex");

class DishsController {
   async create(request, response) {
      const { name, description, price, img, adm, ingredients } = request.body;
      const { user_id } = request.params;

      const dish_id = await knex("dishs").insert({
         name,
         description,
         price,
         img,
         adm,
         user_id
      });

      const ingredientsInsert = ingredients.map(name => {
         return{
            dish_id,
            name,
            user_id
         } 
      })

      await knex("ingredients").insert(ingredientsInsert);

      response.json();
   }

   async update(request, response) {
      const { Status, Details } = request.body;
      const { id } = request
   }
}

module.exports = DishsController;