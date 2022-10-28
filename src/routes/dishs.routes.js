const { Router } = require("express");

const multer = require("multer");

const uploadConfig = require("../configs/upload");

const DishsController = require("../controllers/DishsController");

const DishsImagemController = require("../controllers/DishsImagemController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishsRouter = Router();
dishsRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER);

const dishsController = new DishsController();
const dishsImagemController = new DishsImagemController();

function checkUserIsAdm(req, resp, next) {
   if(!req.body.adm || req.body.adm === null) {
      return resp.json({ message: "Somente o usuário administrador têm permissão para cadastrar ou editar um prato!"})
   }
   next();
}

dishsRouter.post("/", checkUserIsAdm, dishsController.create);
dishsRouter.put("/:id", checkUserIsAdm, dishsController.update);
dishsRouter.delete("/:id", checkUserIsAdm, dishsController.delete);
dishsRouter.get("/", dishsController.index);
dishsRouter.patch("/avatar", upload.single("avatar"), dishsImagemController.update);

module.exports = dishsRouter;