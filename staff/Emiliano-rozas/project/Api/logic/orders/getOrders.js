import { Order, User } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => { //agregar userId , token  ,trer el rol de admin, si lo es traemos todas , si no solo las del usuario.
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            const isAdmin = user.role === 'moderator'

            return Order.find(isAdmin ? {} : { user: userId })
                .populate({
                    path: 'user',
                    select: 'name role',
                })
                .populate({
                    path: 'items',
                    populate: {
                        path: 'product',
                        model: 'Product',
                    },
                })
                .lean()//Hay que hacer el lean() conjunta a la operacion.
                .sort({ createdAt: -1 })
        }).catch(error => {
            console.error(error)
            throw new SystemError(error.message)
        })
        .then(orders => {
            orders.forEach((order) => {
                order.id = order._id.toString()
                delete order._id

                const { user, items } = order

                if (user && user._id) {
                    user.id = user._id.toString()
                    delete user._id
                }

                if (items) {
                    items.forEach(item => {
                        item.id = item._id.toString()
                        delete item._id

                        if (item.product) {
                            item.product.id = item.product._id.toString()
                            delete item.product._id
                        }
                    })
                }
            })

            return orders
        })
}