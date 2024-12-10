import { createFunctionalHandler } from '../../../middleware/index.js';
import logic from '../../../logic/index.js';

export default createFunctionalHandler((req, res) => {
    const { id } = req.params;

    return logic.retrievePayment(id)
        .then(paymentIntent => res.json(paymentIntent));
});
