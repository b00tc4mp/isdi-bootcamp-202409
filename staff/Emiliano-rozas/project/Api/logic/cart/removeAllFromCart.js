import { Cart, CartItem } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId, cartItemId) => {
    validate.id(userId, 'userId');
    validate.id(cartItemId, 'cartItemId');

    return Cart.findOne({ user: userId })
        .then(cart => {
            if (!cart) throw new NotFoundError('cart not found');

            const cartItemIndex = cart.items.findIndex(item => item._id.toString() === cartItemId)
            if (cartItemIndex < 0) {
                throw new NotFoundError('cart item not found')
            }
            // diltramos los items del carrito para eliminar el que coincide con el cartItemId
            const filteredItems = cart.items.filter(item => item._id.toString() !== cartItemId);

            // actualizamos el carrito con los items restantes
            cart.items = filteredItems;

            // erecalculamos el precio total del carrito solo si hay items restantes
            let totalPrice = 0;
            if (cart.items.length > 0) { // nunca nos iba a dar el valor correcto si no haciamos esta comprobacion
                return CartItem.find({ _id: cart.items }).populate('product', 'price').lean() //sin esto no podemos acceder al precio y peta (nos lo determina como price undefined)
                    .then(items => {
                        totalPrice = items.reduce((total, item) => {
                            if (item.product && item.product.price) {
                                return total + item.quantity * item.product.price;
                            }
                            return total;
                        }, 0);
                        return Cart.updateOne({ _id: cart._id }, { items: cart.items, totalPrice });
                    });
            } else {
                // Si no hay items restantes, el totalPrice se deja como 0
                return Cart.updateOne({ _id: cart._id }, { items: cart.items, totalPrice: 0 });
            }
        })
        .then(() => {
            return { message: 'Item removed from cart succesfully' };
        })
        .catch(error => {
            throw new SystemError(error.message);
        });
};
