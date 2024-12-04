import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { productId, quantity } } = req

    return logic.addToCart(userId, productId, quantity).then(() => res.status(200).send())
})