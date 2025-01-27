import logic from "../../../logic/index.js";
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { paymentId } } = req

    return logic.deletePayment(userId, paymentId)
        .then(() => {
            res.status(204).send()
        })
})