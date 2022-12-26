const { Router } = require("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const IngredientsController = require("../controllers/IngredientsController");

const uploadConfig = require("../configs/upload");

const multer = require("multer");

const upload = multer(uploadConfig.MULTER);

const ingredientsRouter = Router();

const ingredientsController = new IngredientsController();

ingredientsRouter.get("/", ingredientsController.index);
ingredientsRouter.patch("/:id", ensureAuthenticated, upload.single("img"), ingredientsController.update);

module.exports = ingredientsRouter;