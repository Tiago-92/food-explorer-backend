const { Router } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const UsersController = require("../controllers/UsersController");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

usersRouter.post("/", usersController.create);

module.exports = usersRouter;