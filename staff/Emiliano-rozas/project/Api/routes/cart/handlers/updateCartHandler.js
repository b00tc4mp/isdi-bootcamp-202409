import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js';

export default createFunctionalHandler((req, res) => {
    const { userId } = req;
    const { productId, quantity } = req.body;

    return logic.updateCart(userId, productId, quantity)
        .then(cart => res.json(cart))
});