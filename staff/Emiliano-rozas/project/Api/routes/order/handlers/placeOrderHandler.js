import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.placeOrder(userId).then(() => res.status(200).json({ message: 'Order Placed successfully' }))
})
