const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishsImagemController {
   async update (request, response) {
      const { id } = request.body;
      const avatarFilename = request.file.filename;

      const diskStorage = new DiskStorage();

      const user = knex("dishs")
      .where({ id }).first();

      if (user.avatar) {
         await diskStorage.deleteFile(user.avatar)
      }

      const filename = await diskStorage.saveFile(avatarFilename);
      user.avatar = filename;

      await knex("dishs").update(user).where({ id });

      return response.json(user)
   }
}

module.exports = DishsImagemController;