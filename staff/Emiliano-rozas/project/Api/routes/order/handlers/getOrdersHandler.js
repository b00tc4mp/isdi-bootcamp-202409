import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler(async (req, res) => {
    const { userId } = req;

    const orders = await logic.getOrders(userId)

    res.status(200).json(orders)
})