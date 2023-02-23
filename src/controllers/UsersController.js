const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

const knex = require("../database/knex");

class UsersController {
   async create(request, response) {
      const { name, email, password, isAdm } = request.body;

      const userRepository = new UserRepository();
      const userCreateService = new UserCreateService(userRepository);

      await userCreateService.execute({ name, email, password, isAdm });

      return response.status(201).json()
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("users").where({ id }).delete();

      response.json();
   }
}

module.exports = UsersController;