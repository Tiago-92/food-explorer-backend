const { Router } = require("express");

const CartController = require("../controllers/CartController");

const cartRouter = Router();

const cartController = new CartController();

cartRouter.post("/", cartController.create);
cartRouter.get("/", cartController.show);
cartRouter.delete("/:id", cartController.delete);

module.exports = cartRouter;