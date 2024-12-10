import stripe from '../../config/stripe.js'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors;

export default (paymentIntentId) => {
    validate.id(paymentIntentId, 'paymentIntentId')

    return stripe.paymentIntents.retrieve(paymentIntentId)
        .then(paymentIntent => {
            if (!paymentIntent) {
                throw new NotFoundError('Payment intent not found');

            }
            return paymentIntent
        })
        .catch(error => {
            console.error('Error retrieving payment intent:', error);
            throw new SystemError(error.message);
        });
};




// const SECRET_KEY = 'sk_test_51QU9fX2MF6fQIQKDIAReWdDOkLZgxKZeZMVSQ4WPYFGRRzz7nIbY2bRKwhgHpXWczMin2ms1PTk3s0IhmYMwIZxE00i1wkQt9D'

// const paymentIntent = await stripe.paymentIntents.retrieve()
