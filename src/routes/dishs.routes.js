const { Router } = require("express");

const DishsController = require("../controllers/DishsController");

const dishsRouter = Router();

const dishsController = new DishsController();

function checkUserIsAdm(req, resp, next) {
   if(!req.body.adm || req.body.adm === null) {
      return resp.json({ message: "Somente o usuário administrador têm permissão para cadastrar ou editar um prato!"})
   }
   next();
}

dishsRouter.post("/:user_id", checkUserIsAdm, dishsController.create);
dishsRouter.put("/:id", checkUserIsAdm, dishsController.update);
dishsRouter.delete("/:id", checkUserIsAdm, dishsController.delete);
dishsRouter.get("/", dishsController.index);

module.exports = dishsRouter;