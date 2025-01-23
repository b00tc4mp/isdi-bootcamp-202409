import logic from '../../../logic/index.js';
//import { createFunctionalHandlers } from '../../helpers/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

/* const { userId } = req.body
console.log('user Id from req.body es: ' + userId) */

export default createFunctionalHandler(async (req, res) => {
    const { userId, body: { packName, packDescription, quantity, unit, expiringTime, price, currency } } = req

    await logic.createBasePack(userId,
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