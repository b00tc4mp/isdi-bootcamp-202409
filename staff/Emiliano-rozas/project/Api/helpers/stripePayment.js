import stripe from '../config/stripe.js'
import { errors } from 'com'

const { SystemError } = errors


export default (amount, paymentMethodId) => {
    return stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        payment_method: paymentMethodId,
        confirm: true,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never'
        },

    })
        .catch(error => {
            throw new SystemError(error.message || 'Failed to process Stripe payment');
        })
}
