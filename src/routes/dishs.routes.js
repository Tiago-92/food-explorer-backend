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

dishsRouter.post("/", upload.single("img"), dishsAdmController.create);
dishsRouter.put("/:id", dishsAdmController.update);
dishsRouter.delete("/:id", dishsAdmController.delete);
dishsRouter.get("/", dishsController.index);
dishsRouter.get("/:id", dishsController.show);
dishsRouter.patch("/dishimage/:id", upload.single("img"), dishsImagemController.update);

module.exports = dishsRouter;