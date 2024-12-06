import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { params: { orderId }, body: { status } } = req

    return logic.updateOrder(orderId, status).then(() => res.status(204).send())
})