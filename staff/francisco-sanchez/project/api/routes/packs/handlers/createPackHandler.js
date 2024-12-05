import logic from '../../../logic/index.js';
//import { createFunctionalHandlers } from '../../helpers/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId, packName, packDescription, quantity, unit, expiringTime, price, currency } = req.body

    await logic.createPack(userId,
        packName,
        packDescription,
        quantity,
        unit,
        expiringTime,
        price,
        currency
    )

    res.status(201).send()
})