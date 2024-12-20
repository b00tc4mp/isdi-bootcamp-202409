import { User, Cart, Order, OrderItem } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Cart.findOne({ user: userId }).populate({
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
            if (!cart || cart.items.length === 0) throw new NotFoundError('cart is empty')

            // se crear OrderItem para cada item en el carrito, si no lo hacemos asi y lo hacemos como antes. se crea la orden pero sin OrderItems como tal
            const orderItems = cart.items.map(item => {
                return OrderItem.create({
                    product: item.product,
                    quantity: item.quantity
                }).catch(error => {
                    throw new SystemError(error.message)
                })
            })
            // esperamos a que se creen todos los OrderItems
            return Promise.all(orderItems)
                .then(orderItems => ({ // retorna obj ecsma6
                    orderItems,
                    cart,
                }))
        })
        //porque promesa? bueno, porque las llamadas a bd pueden demorarse, de esta manera esperamos a que se completen todas las llamadas a bd y devuelvan los Order Items
        .then(({ orderItems, cart }) => {
            // se crea la orden referenciando los OrderItems creados y al precio que viene del cart

            return Order.create({
                user: userId.toString(),
                items: orderItems.map(orderItem => orderItem._id),
                totalPrice: cart.totalPrice,
                createdAt: new Date(),
            }).catch(error => {
                throw new SystemError(error.message)
            })
        })
        .then(order => {
            // vaciamos carrito, tiene sentido volver a utilizarlo
            return Cart.updateOne({ user: userId }, { items: [], totalPrice: 0 })
                .catch(error => {
                    throw new SystemError(error.message)
                })
                .then(() => order)
        })
        .then(order => ({
            orderId: order._id.toString(),
            order,
        }))
}
