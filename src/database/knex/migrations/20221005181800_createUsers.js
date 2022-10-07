exports.up = knex => knex.schema.createTable("users", table => {
   table.increments("id").primary();
   table.string("name");
   table.string("email").unique();
   table.string("password");
   table.boolean("isAdm");

   table.timestamp("create_at").default(knex.fn.now());
   table.timestamp("update_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
