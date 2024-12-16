import { User, Cart } from 'dat'
import { validate, errors } from 'com'

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
                select: 'title price image'
            }
        }).select('-_id -user').lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, cart]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!cart) throw new NotFoundError('cart not found')

            cart.items.forEach(item => {
                item.id = item._id.toString()
                delete item._id
                if (item.product && item.product._id) {
                    item.product.id = item.product._id.toString()
                    delete item.product._id
                }
            })

            return cart
        })
}