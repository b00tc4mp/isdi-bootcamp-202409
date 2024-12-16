import logic from '../logic/index.js';
import { createFunctionalHandler } from '../middleware/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req;
    const { productId, quantity } = req.body;

    const result = await logic.addToCart(userId, productId, quantity);

    res.status(200).json(result);
});