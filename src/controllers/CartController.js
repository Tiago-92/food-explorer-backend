const knex = require("../database/knex");

class CartController {
   async create(request, response) {
      const { id } = request.query;
      const { quantity } = request.body;
      
      const db = await knex.from(knex.raw('?? (??, ??, ??, ??, ??, ??)', ['cart', 'dish_id', 'dish_title', 'dish_img', 'dish_price', 'quantity', 'user_id']))
      .insert(function() {
         this.from('dishs')
         .where({ id })
         .select('id', 'title', 'img', 'price', quantity, 'user_id')
      });

      return response.status(201).json(db);
   }

   async delete(request, response) {

      await knex("cart").where({ id }).delete();

      return response.status(200).json();
   }

   async show(request, response) {
      const { user_id } = request.query;

      const order = await knex("cart").where({ user_id });
      console.log(order)
      
      return response.json([...order]);
   }
}

module.exports = CartController;