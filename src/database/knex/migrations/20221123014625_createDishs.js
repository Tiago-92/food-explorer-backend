exports.up = knex => knex.schema.createTable("dishs", table => {
   table.increments("id");
   table.text("title");
   table.text("description");
   table.integer("price");
   table.text("img");
   table.integer("user_id").references("id").inTable("users");
   table.boolean("adm").references("isAdm").inTable("users");

   table.timestamp("created_at").default(knex.fn.now());
   table.timestamp("update_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("dishs");