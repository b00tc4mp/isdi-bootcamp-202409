import { User, Product, Cart, CartItem } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors;

export default (userId, productId, quantity) => {
    validate.id(userId, 'userId')
    validate.id(productId, 'productId')
    validate.number(quantity, 'quantity')

    return (async () => {
        let user

        try {
            //Verificamos que el usuario exista
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('User not Found')
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
        // si esta le sumamos la cantidad
        if (cartItem) {
            cartItem.quantity += quantity
            try {
                await cartItem.save()
            } catch (error) {
                throw new SystemError(error.message)
            }
            //si no lo creamos
        } else {
            try {
                cartItem = await CartItem.create({ product: productId, quantity })
                cart.items.push(cartItem)
            } catch (error) {
                throw new SystemError(error.message)
            }
        }
        //sumamos los totales para darle precio
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.quantity * product.price
        }, 0)

        try {
            await cart.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
        return { message: 'Product added to cart successfully', cart };
    }
    )()
}


