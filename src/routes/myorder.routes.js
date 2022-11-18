const { Router } = require("express");

const MyOrderController = require("../controllers/MyOrderController");

const myorderRouter = Router();

const myorderController = new MyOrderController();

myorderRouter.post("/", myorderController.create);
myorderRouter.delete("/:id", myorderController.delete);

module.exports = myorderRouter;