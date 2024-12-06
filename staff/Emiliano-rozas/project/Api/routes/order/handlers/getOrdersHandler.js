import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler(async (req, res) => {

    const orders = await logic.getOrders()

    res.status(200).json(orders)
})