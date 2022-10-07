exports.up = knex => knex.schema.createTable("ingredients", table => {
   table.increments("id");
   table.text("name").notNullable();

   table.integer("dish_id").references("id").inTable("dishs").onDelete("CASCADE");
   table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.createTable("ingredients");