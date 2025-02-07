import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {

    const { userId, params: { basePackId }, body: { packName, description, quantity, unit, expiringTime, price, currency } } = req

    return logic.updateBasePack(userId, basePackId, packName, description, quantity, unit, expiringTime, price, currency)
        .then(() => {
            res.status(201).send()
        })
})