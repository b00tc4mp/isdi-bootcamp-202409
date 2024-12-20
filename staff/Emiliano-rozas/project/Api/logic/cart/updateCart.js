import { User, Product, Cart, CartItem } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, productId, quantity) => {
    validate.id(userId, 'userId')
    validate.id(productId, 'productId')
    validate.number(Number(quantity), 'quantity')

    return (async () => {
        let user
        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) throw new NotFoundError('User not found')

        let cart
        try {
            //buscamos el carrito, si esta flama, sino lo creamo, cortita la bocha
            cart = await Cart.findOne({ user: userId })
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            if (!cart) {
                cart = await Cart.create({ user: userId })
            }
        } catch (error) {
            throw new SystemError(error.message)
        }

        let product
        try {
            //Buscamos el producto en la base de datos
            product = await Product.findById(productId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!product) throw new NotFoundError('Product not found')

        let cartItem
        try {
            //Verificamos si esta en el carrito
            cartItem = await CartItem.findOne({ product: productId, _id: cart.items })
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (cartItem) {
            // si la cantidad es menor o igual a 0, lo damos de baja
            if (quantity <= 0) {
                try {
                    await CartItem.deleteOne({ _id: cartItem._id })
                    cart.items.pull(cartItem._id) // con pull no se hace cart Save
                } catch (error) {
                    throw new SystemError(error.message)
                }
            } else {
                // Actualizamos la cantidad si el producto ya está en el carrito
                try {
                    cartItem.quantity = quantity
                    await cartItem.save()
                } catch (error) {
                    throw new SystemError(error.message)
                }
            }
        } else { // escenario si no hay cartItem
            if (quantity > 0) {
                try {
                    cartItem = await CartItem.create({ product: productId, quantity })
                    cart.items.push(cartItem._id) // Añadir solo el ID del CartItem
                    await cart.save() // Guardar el garrito después de modificar los items
                } catch (error) {
                    throw new SystemError(error.message)
                }

            }
        }
        // Recalculamos el total del carrito
        try {
            // devuelta el populate para obtener todos los items con el precio del producto, sino va a tirar NaN el precio, porque no estaba pudiendo acceder a los valores del precio, estabamos sumando manzanas con peras
            await cart.populate({
                path: 'items',
                populate: {
                    path: 'product',
                    select: 'price',
                },
            })

            cart.totalPrice = cart.items.reduce((total, item) => {
                return total + item.quantity * (item.product.price || 0)
            }, 0)

            await cart.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
        return cart
    })()
}