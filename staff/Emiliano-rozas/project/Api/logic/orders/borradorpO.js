import { User, Cart, Order, OrderItem } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Cart.findOne({ user: userId }).populate({  //Hacemos el populate para obtener la informacion que tra consigo el carrito y no solo el id, esto sera importante para luego podes manipularla
            path: 'items',
            populate: {
                path: 'product',
                model: 'Product',
            },
        }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, cart]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!cart) throw new NotFoundError('cart not found')

            return Order.create({
                user: userId,
                items: cart.items.map(item => ({
                    product: item.product,
                    quantity: item.quantity
                })),
                totalPrice: cart.totalPrice,
                createdAt: new Date(),
            });
        })
        .then(order => {
            return Cart.updateOne({ user: userId }, { items: [], totalPrice: 0 })
                .then(() => order)
        })
        .then(order => ({
            message: 'Order place succesfully',
            order,
        }))
        .catch(error => {
            throw new SystemError(error.message);

        })
}
