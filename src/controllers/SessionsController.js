const knex = require("../database/knex");

const AppError = require("../utils/AppError");

const authConfig = require("../configs/auth");

const { compare } = require("bcryptjs");

const { sign } = require("jsonwebtoken");

class SessionsController {
   async create(request, response) {
      const { email, password } = request.body;

      const user = await knex("users").where({ email }).first();

      if(!user) {
         throw new AppError("Usuário e/ou senha icorreta!")
      }

      const passwordCompare = await compare(password, user.password);

      if(!passwordCompare) {
         throw new AppError("Usuário e/ou senha icorreta!")
      }

      const { secret, expiresIn } = authConfig.jwt; // criar token para o usuário
      const token = sign({}, secret, {
         subject: String(user.id),
         expiresIn
      })

      return response.json({ user, token });
   }
}

module.exports = SessionsController;