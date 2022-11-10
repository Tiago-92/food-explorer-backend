const { Router } = require("express");

const multer = require("multer");

const uploadConfig = require("../configs/upload");

const DishsController = require("../controllers/DishsController");
const DishsAdmController = require("../controllers/DishsAdmController");
const DishsImagemController = require("../controllers/DishsImagemController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishsRouter = Router();
dishsRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER);

const dishsAdmController = new DishsAdmController();
const dishsController = new DishsController();
const dishsImagemController = new DishsImagemController();

function checkUserIsAdm(req, resp, next) {
   if(!req.body.adm || req.body.adm === null) {
      return resp.json({ message: "Somente o usuário administrador têm permissão para cadastrar ou editar um prato!"})
   }
   next();
}

dishsRouter.post("/", checkUserIsAdm, dishsAdmController.create);
dishsRouter.put("/:id", checkUserIsAdm, dishsAdmController.update);
dishsRouter.delete("/:id", checkUserIsAdm, dishsAdmController.delete);
dishsRouter.get("/", dishsController.index);
dishsRouter.patch("/dishimage/:id", ensureAuthenticated, upload.single("avatar"), dishsImagemController.update);

module.exports = dishsRouter;