const knex = require("../database/knex");

class OrdersController {
    async create(request, response) {
        
        const { id } = request.query;

        const insertDishs = await knex.from(knex.raw('?? (??, ??, ??)', ['orders', 'cart_id', 'dish_id', 'dish_title']))
        .insert(function() {
            this.from('cart')
            .where({ id })
            .select('id', 'dish_id', 'dish_title')
        });

      return response.status(201).json(insertDishs);
    }

    async show(request, response) {

        const orders = await knex('orders')
        .innerJoin('cart', 'cart.id', 'orders.cart_id')


        const filterCart = await knex("cart");
        const ordersWithCart = orders.map(orders => {
            const ordersAndCart = filterCart.filter(cart => cart.id === orders.cart_id)

            return {
                ...orders,
                ordersAndCart
            }
        })  

        return response.json([ordersWithCart])
    }
}

module.exports = OrdersController;