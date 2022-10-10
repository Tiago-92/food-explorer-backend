const { Router } = require("express");

const usersRouter = require("./users.routes");
const dishsRouter = require("./dishs.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/dishs", dishsRouter);


module.exports = routes;