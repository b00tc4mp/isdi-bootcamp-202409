import { Order, User } from "dat"
import { validate, errors } from 'com'
import stripePayment from './stripePayment.js'

const { SystemError, NotFoundError } = errors


export default (userId, orderId, paymentMethodId, provider) => {
    validate.id(userId, 'userId')
    validate.id(orderId, 'orderId')
    validate.id(paymentMethodId, 'paymentMethodId')
    validate.text(provider, 'provider')

    console.log('Order ID:', orderId)
    console.log('Payment Method ID:', paymentMethodId)
    console.log('Provider:', provider)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Order.findById(orderId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(order => { //TODO VALIDAR USER
                    if (!order) throw new NotFoundError('order not found')

                    // ahora verificamos que el usuario que realiza el pago es el dueño de la orden
                    if (order.user.toString() !== userId) {
                        throw new AuthorizationError('You are not authorized to pay for this order') // chapuza lombardi
                    }
                    //TODO mover a entero 
                    const amount = Math.round(order.totalPrice * 100) // esto es necesario para convertir los centavos

                    //verificamos que proveedor es para pasaerselo por parametro
                    if (provider === 'stripe') {
                        return stripePayment(amount, paymentMethodId)
                    } else {
                        throw new SystemError(`Unsupported payment provider: ${provider}`)
                    }
                    //este es el objeto que devuelve la pasarela de pago. Una vez que se tramita el pago este devuelve info, que utilizaremos para darle info al usuario final y tambien para almacenar en nuestra base de datos 
                })
        })
        .then(paymentResult => {
            console.log(paymentResult)
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
            }).then(updatedOrder => ({ success: true, paymentResult, updatedOrder }))
        })

};