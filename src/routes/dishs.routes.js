const { Router } = require("express");

const DishsController = require("../controllers/DishsController");

const dishsRouter = Router();

function checkUserIsAdm(req, resp, next) {
   if(!req.body.adm || req.body.adm === null) {
      return resp.json({ message: "Somente o usuário administrador têm permissão para cadastrar ou editar um prato!"})
   }

   next();
}

const dishsController = new DishsController();

dishsRouter.post("/:user_id", checkUserIsAdm, dishsController.create);

module.exports = dishsRouter;