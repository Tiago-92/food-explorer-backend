const knex = require("../database/knex");

const AppError = require("../utils/AppError");

const DiskStorage = require("../providers/DiskStorage");

class DishsImagemController {
   async update(request, response) {
      const { id } = request.params;
      const imageFilename = request.file.filename;

      const diskStorage = new DiskStorage();

      const dishs = await knex("dishs").where({ id }).first();

      if(!dishs) {
         throw new AppError("Esse prato não existe.")
      }

      // excluir a imagem a antiga, para atualizar com a nova
      if(dishs.img) {
         await diskStorage.deleteFile(dishs.img)
      }

      const filename = await diskStorage.saveFile(imageFilename);
      dishs.img = filename

      await knex("dishs").update(dishs).where({ id });

      return response.json(dishs)
   }
}

module.exports = DishsImagemController;