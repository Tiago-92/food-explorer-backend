const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    
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