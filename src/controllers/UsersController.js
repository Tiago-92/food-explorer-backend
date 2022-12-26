const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class UsersController {
   async create(request, response) {
      const { name, email, password, isAdm } = request.body;

      const checkUserExists = await knex
      .select('email')
      .from('users')
      .where('email', email)

      if (checkUserExists.length === 0) {
         const hashedPassword = await hash(password, 8);
         const createUser = await knex('users').insert({
            name,
            email,
            password: hashedPassword,
            isAdm
         })
      } else {
         throw new AppError('Este e-mail já está cadastrado!')
      }

      return response.status(201).json()
   }

   async delete(request, response) {
      const { id } = request.params;

      await knex("users").where({ id }).delete();

      response.json();
   }
}

module.exports = UsersController;