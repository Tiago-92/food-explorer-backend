const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.post("/", ordersController.create);
ordersRouter.get("/", ordersController.show);

module.exports = ordersRouter;