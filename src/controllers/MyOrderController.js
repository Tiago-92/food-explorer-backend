// usando SQL "puro" para o SELECT de "myorder" e "dishs";  
const sqliteConnection = require("../database/sqlite");
// para deletar um pedido, prefiro usar o Knex;
const knex = require("../database/knex");

class MyOrderController {
   async create(request, response) {
      const { id } = request.query;
      const { quantity } = request.body;

      const db = await knex.from(knex.raw('?? (??, ??, ??, ??, ??)', ['myorder', 'dish_id', 'dish_img', 'dish_title', 'dish_price', 'quantity']))
      .insert(function() {
         this.from('dishs')
         .where({ id })
         .select('id', 'img', 'title', 'price', quantity)
      });

      return response.status(201).json(db);
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("myorder").where({ id }).delete();

      response.status(200).json();
   }
}

module.exports = MyOrderController;