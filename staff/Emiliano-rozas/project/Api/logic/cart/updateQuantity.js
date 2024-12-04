import { User, Cart, CartItem } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, cartItemId, newQuantity) => {
    validate.id(userId, 'userId')
    validate.id(cartItemId, 'cartItemId')
    validate.number(newQuantity, 'newQuantity')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Cart.findOne({ user: userId }).populate('items')
        })
        .then(cart => {
            if (!cart) throw new NotFoundError('cart not found')

            const cartItemIndex = cart.items.findIndex(item => item._id.toString() === cartItemId)

            if (cartItemIndex < 0) {
                throw new NotFoundError('cart item not found')
            }
            // Si la nueva cantidad es menor o igual a cero, eliminamos el cartItem del carrito
            if (newQuantity <= 0) {
                return CartItem.deleteOne({ _id: cart.items[cartItemIndex]._id })
                    .then(() => {
                        cart.items.splice(cartItemIndex, 1) // Eliminamos el item del array de items del carrito
                    })
            } else {
                // Actualizamos la cantidad si es mayor que 0
                return CartItem.findByIdAndUpdate(cartItemId, { quantity: newQuantity })
            }
        })
        .then(() => {
            // Volvemos a buscar los items restantes del carrito y calculamos el nuevo totalPrice
            return Cart.findOne({ user: userId }).populate({ path: 'items', populate: { path: 'product' } })
        })
        .then(cart => {
            if (!cart) throw new NotFoundError('cart not found')
            // Calculamos el nuevo totalPrice.
            cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0)
            return cart.save()
        })
        .then(updatedCart => {
            return { message: 'Quantity updated successfully', cart: updatedCart }
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}
