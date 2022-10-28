const { Router } = require("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const IngredientsController = require("../controllers/IngredientsController");

const ingredientsRouter = Router();

const ingredientsController = new IngredientsController();

ingredientsRouter.get("/", ensureAuthenticated, ingredientsController.index);

module.exports = ingredientsRouter;