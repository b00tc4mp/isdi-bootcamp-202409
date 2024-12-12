import stripe from '../../config/stripe.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors;

export default (userId, paymentIntentId) => {
    validate.id(userId, 'userId')
    validate.id(paymentIntentId, 'paymentIntentId')

    return stripe.paymentIntents.retrieve(paymentIntentId)
        .then(paymentIntent => {
            if (!paymentIntent) {
                throw new NotFoundError('Payment intent not found');

            }
            return Order.findOne({ paymentIntentId: paymentIntent.id })
                .then(order => {
                    if (!order) {
                        throw new NotFoundError('Order associated with this payment intent not found');
                    }

                    if (order.user.toString() !== userId) {
                        throw new AuthorizationError('You are not authorized to retrieve this payment intent');
                    }
                    return paymentIntent
                })
        })
};