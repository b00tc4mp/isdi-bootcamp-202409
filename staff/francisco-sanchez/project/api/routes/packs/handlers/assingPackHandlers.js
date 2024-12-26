import logic from "../../../logic/index.js";
import { createFunctionalHandler } from '../../helpers/index.js';


export default createFunctionalHandler(async (req, res) => {
    const { userId, body: { customerSearch, selectPack, payedAmount, paymentMethod } } = req

    await (logic.assignPack(userId, customerSearch, selectPack, payedAmount, paymentMethod))

    res.status(201).send()
})