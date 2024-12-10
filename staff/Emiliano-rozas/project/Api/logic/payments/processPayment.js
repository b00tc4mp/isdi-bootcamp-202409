import { Order } from "dat";
import { validate, errors } from 'com'
import stripePayment from './stripePayment.js'

const { SystemError, NotFoundError } = errors;


export default (orderId, paymentMethodId, provider) => {
    validate.id(orderId, 'orderId')
    validate.id(paymentMethodId, 'paymentMethodId')
    validate.text(provider, 'provider')

    console.log('Order ID:', orderId);
    console.log('Payment Method ID:', paymentMethodId);
    console.log('Provider:', provider);

    return Order.findById(orderId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(order => {
            if (!order) throw new NotFoundError('order not found');

            const amount = Math.round(order.totalPrice * 100) // esto es necesario para convertir los centavos

            //verificamos que proveedor es para pasaerselo por parametro
            if (provider === 'stripe') {
                return stripePayment(amount, paymentMethodId);
            } else {
                throw new SystemError(`Unsupported payment provider: ${provider}`);
            }

        }).then(paymentResult => ({ success: true, paymentResult })) //este es el objeto que devuelve la pasarela de pago. Una vez que se tramita el pago este devuelve info, que utilizaremos para darle info al usuario final y tambien para almacenar en nuestra base de datos 
        .catch(error => {
            console.error(error)
            throw new SystemError(error.message)
        })
}
