import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.getCart(userId).then(cart => res.json(cart))
})