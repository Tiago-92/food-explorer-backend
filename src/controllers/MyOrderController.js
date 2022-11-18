// usando SQL "puro" para o SELECT de "myorder" e "dishs";  
const sqliteConnection = require("../database/sqlite");
// para deletar um pedido, prefiro usar o Knex;
const knex = require("../database/knex");

class MyOrderController {
   async create(request, response) {
      const { id } = request.query;

      const database = await sqliteConnection();

      await database.run(
         // inserir dados de "id", "img", title" e "price" na tabela "myorder" a partir  
         // da tabela "dishs", usar como parâmetro o id do prato
         "INSERT INTO myorder (dish_id, dish_img, dish_title, dish_price) SELECT id, img, title, price FROM dishs WHERE id = (?)", [id],
      );
      
      return response.status(201).json();
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("myorder").where({ id }).delete();

      response.status(200).json();
   }
}

module.exports = MyOrderController;