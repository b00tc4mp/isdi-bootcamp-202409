import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { cartItemId } } = req

    return logic.removeAllFromCart(userId, cartItemId).then(() => res.status(204).send())
})