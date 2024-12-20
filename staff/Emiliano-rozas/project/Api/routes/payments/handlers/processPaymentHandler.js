import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { orderId, paymentMethodId, provider } = req.body;

    const { userId } = req

    return logic.processPayment(userId, orderId, paymentMethodId, provider)
        .then(({ paymentResult }) => res.status(201).json({ paymentResult }))
})