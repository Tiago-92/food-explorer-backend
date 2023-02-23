const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex
      .select('email')
      .from('users')
      .where('email', email)

      return user
  }

  async create({ name, email, password, isAdm }) {
    const userId = await knex('users').insert({
      name,
      email,
      password,
      isAdm
   });

   return { id: userId };
  }
}

module.exports = UserRepository;