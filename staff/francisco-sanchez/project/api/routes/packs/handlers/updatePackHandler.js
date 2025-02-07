import logic from '../../../logic/index.js';
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {

    const { userId, params: { packId }, body: { description, remainingQuantity, expiryDate, status } } = req

    return logic.updatePack(userId, packId, description, remainingQuantity, expiryDate, status)
        .then(() => {
            res.status(201).send()
        })
})