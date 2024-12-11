import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { orderId, paymentMethodId, provider } = req.body;

    const { userId } = req

    return logic.processPayment(orderId, paymentMethodId, provider, userId)

        .then(() => res.status(201).json({ message: 'Payment successful' }))
        .catch(error => {
            console.error('Error in processPaymentHandler:', error);
            res.status(500).json({ message: 'Payment failed', error: error.message });
        });
});