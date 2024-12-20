import { Order, User } from "dat"
import { validate, errors } from 'com'
import stripePayment from '../../helpers/stripePayment.js'

const { SystemError, NotFoundError } = errors

export default (userId, orderId, paymentMethodId, provider) => {
    validate.id(userId, 'userId')
    validate.id(orderId, 'orderId')
    validate.id(paymentMethodId, 'paymentMethodId')
    validate.text(provider, 'provider')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Order.findById(orderId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(order => {
                    if (!order) throw new NotFoundError('order not found')

                    const amount = BigInt(Math.round(order.totalPrice * 100)); // esto es necesario para convertir los centavos

                    //verificamos que proveedor es para pasaerselo por parametro
                    if (provider === 'stripe') {
                        return stripePayment(amount, paymentMethodId)
                    } else {
                        throw new SystemError('Not suport porvider')
                    }
                    //este es el objeto que devuelve la pasarela de pago. Una vez que se tramita el pago este devuelve info, que utilizaremos para darle info al usuario final y tambien para almacenar en nuestra base de datos 
                })
        })
        .then(paymentResult => {
            if (!paymentResult || paymentResult.status !== 'succeeded') { // Verificamos que el pago fue exitoso
                throw new SystemError('Payment was not successful')
            }
            // Si el pago es exitoso, actualizamos el estado de la orden a "confirmed"
            return Order.findByIdAndUpdate(
                orderId,
                { status: 'confirmed' },
                { new: true } //le indicamos a Mongoose que queremos recibir el documento con los cambios ya aplicados.
            ).catch(error => {
                throw new SystemError(error.message)

            }).then(updatedOrder => ({
                success: true,
                paymentResult,
                updatedOrder
            }))
        })

};