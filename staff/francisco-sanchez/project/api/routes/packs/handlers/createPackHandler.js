import logic from '../../../logic/index.js';
//import { createFunctionalHandlers } from '../../helpers/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { user, packName, description, quantity, unit, expiringTime, price, currency } = req.body

    await logic.createPack(user,
        packName,
        description,
        quantity,
        unit,
        expiringTime,
        price,
        currency
    )

    res.status(201).send()
})