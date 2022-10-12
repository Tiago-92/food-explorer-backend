exports.up = knex => knex.schema.createTable("order", table => {
   table.increments("id");
   table.text("Status");
   table.text("Details").references("name").inTable("dishs");
   table.integer("user_id").references("id").inTable("users");

   table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("order");