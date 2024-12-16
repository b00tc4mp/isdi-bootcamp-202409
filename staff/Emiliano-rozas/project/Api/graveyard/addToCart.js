import { User, Product, Cart, CartItem } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors;

export default (userId, productId, quantity) => {
    validate.id(userId, 'userId')
    validate.id(productId, 'productId')
    validate.number(Number(quantity), 'quantity')

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
        // smamos los totales para calcular el precio
        try {
            // devuelta el populate para obtener todos los items con el precio del producto, sino va a tirar NaN el precio, porque no estaba pudiendo acceder a los valores del precio, estabamos sumando manzanas con peras
            await cart.populate({
                path: 'items',
                populate: {
                    path: 'product',
                    select: 'price'
                }
            })
            // se calcula prcio total
            cart.totalPrice = cart.items.reduce((total, item) => {
                return total + (item.quantity * (item.product.price || 0));
            }, 0);

        } catch (error) {
            throw new SystemError('Failed to calculate total price: ' + error.message);
        }
        try {
            await cart.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
        return { message: 'Product added to cart successfully', cart };
    }
    )()
}


