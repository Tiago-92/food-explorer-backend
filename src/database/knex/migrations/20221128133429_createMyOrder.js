exports.up = knex => knex.schema.createTable("myorder", table => {
   table.increments("id");
   table.text("dish_title");
   table.integer("quantity");
   table.integer("dish_price");
   table.text("dish_img");
   table.integer("dish_id").references("id").inTable("dishs");
   table.text("user_id").references("id").inTable("users");

   table.timestamp("created_at").default(knex.fn.now());
   table.timestamp("update_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("myorder");