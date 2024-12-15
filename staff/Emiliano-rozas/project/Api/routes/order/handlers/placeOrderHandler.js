import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../../middleware/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req

    return logic.placeOrder(userId)
        .then(({ orderId }) => res.status(200).json({ orderId })) // si no se envia por aqui el orderId, nunca llega al front
})