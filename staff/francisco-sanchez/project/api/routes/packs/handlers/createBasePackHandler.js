import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js';

export default createFunctionalHandler(async (req, res) => {
    const { userId, body: { packName, packDescription, quantity, unit, expiringTime, price, currency } } = req

    await logic.createBasePack(userId, packName, packDescription, quantity, unit, expiringTime, price, currency)

    res.status(201).send()
})