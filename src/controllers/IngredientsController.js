const knex = require("../database/knex");

const DiskStorage = require("../providers/DiskStorage");
class IngredientsController {
   async index(request, response) {
      const name = request.query;

      const ingredients = await knex("ingredients").where({ name });

      return response.json(ingredients);
   }

   async update(request, response) {
      const { id } = request.params;
      const imageFilename = request.file.filename;

      const diskStorage = new DiskStorage();

      const ingredients = await knex("ingredients").where({ id }).first();

      const filename = await diskStorage.saveFile(imageFilename);
      ingredients.img = filename

      await knex("ingredients").update(ingredients).where({ id });

      return response.json(ingredients)
   }
}

module.exports = IngredientsController;