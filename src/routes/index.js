const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishsRouter = require("./dishs.routes");
const ingredientsRouter = require("./ingredients.routes");
const sessionsRouter = require("./sessions.routes");
const cartRouter = require("./cart.routes");
const ordersRouter = require("./orders.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishs", dishsRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/cart", cartRouter);
routes.use("/orders", ordersRouter);

module.exports = routes;