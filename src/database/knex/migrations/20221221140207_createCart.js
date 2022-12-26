exports.up = knex => knex.schema.createTable("cart", table => {
    table.increments("id");
    table.text("dish_id").references("id").inTable("dishs");
    table.text("dish_title");
    table.text("dish_img");
    table.integer("dish_price");
    table.integer("quantity");
    table.text("user_id").references("id").inTable("users");
 
    table.timestamp("created_at").default(knex.fn.now());
 });
 
 exports.down = knex => knex.schema.dropTable("cart");