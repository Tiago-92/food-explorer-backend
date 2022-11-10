const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishsRouter = require("./dishs.routes");
const ingredientsRouter = require("./ingredients.routes");
const sessionsRouter = require("./sessions.routes");
const myorderRouter = require("./myorder.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishs", dishsRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/myorder", myorderRouter);

module.exports = routes;