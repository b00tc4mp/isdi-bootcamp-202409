import { createFunctionalHandler } from '../../../middleware/index.js';
import logic from '../../../logic/index.js';

export default createFunctionalHandler((req, res) => {

    const { paymentIntentId } = req.params;
    const { userId } = req

    return logic.retrievePayment(userId, paymentIntentId)
        .then(paymentIntent => res.json(paymentIntent));
});