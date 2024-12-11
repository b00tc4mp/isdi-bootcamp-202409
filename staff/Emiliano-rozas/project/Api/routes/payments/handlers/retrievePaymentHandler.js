import { createFunctionalHandler } from '../../../middleware/index.js';
import logic from '../../../logic/index.js';

export default createFunctionalHandler((req, res) => {

    const { id } = req.params;
    const { userId } = req

    return logic.retrievePayment(id, userId)
        .then(paymentIntent => res.json(paymentIntent));
});
