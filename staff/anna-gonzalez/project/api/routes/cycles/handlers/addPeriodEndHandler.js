import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { periodEnd } } = req

    return logic.addPeriodEnd(userId, periodEnd).then(() => res.status(201).send())
})