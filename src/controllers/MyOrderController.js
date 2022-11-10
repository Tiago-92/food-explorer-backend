const sqliteConnection = require("../database/sqlite");

class MyOrderController {
   async create(request, response) {
      const { id } = request.params;
         
      const database = await sqliteConnection();

      await database.run(
         // inserir dados de "id", "img", title" e "price" na tabela "myorder" a partir  
         // da tabela "dishs", usar como parâmetro o id do prato
         "INSERT INTO myorder (dish_id, dish_img, dish_title, dish_price) SELECT id, img, title, price FROM dishs WHERE id = (?)", [id],
      );
      return response.status(201).json();
   }
}

module.exports = MyOrderController;