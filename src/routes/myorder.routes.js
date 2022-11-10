const { Router } = require("express");

const MyOrderController = require("../controllers/MyOrderController");

const myorderRouter = Router();

const myorderController = new MyOrderController();

myorderRouter.post("/:id", myorderController.create);

module.exports = myorderRouter;