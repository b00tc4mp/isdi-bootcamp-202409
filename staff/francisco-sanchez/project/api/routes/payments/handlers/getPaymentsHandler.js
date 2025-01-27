import logic from '../../../logic/index.js'

import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { packId } } = req

    return logic.getPayments(userId, packId)
        .then(payments => res.json(payments))
})