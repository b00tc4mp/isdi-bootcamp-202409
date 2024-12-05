import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { currentDate } } = req

    return logic.getPeriodDays(userId, currentDate).then(() => res.status(201).send())
})