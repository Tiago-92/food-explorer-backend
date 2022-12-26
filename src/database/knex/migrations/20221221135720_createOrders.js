exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.integer("cart_id").references("id").inTable("cart")
    table.integer("dish_id").references("id").inTable("dishs");
    table.integer("dish_title");
    table.enu('status', ['Pendente', 'Preparando', 'Entregue']).defaultTo('Pendente', options={})
    
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("update_at").default(knex.fn.now());
 });
 
 exports.down = knex => knex.schema.dropTable("orders");