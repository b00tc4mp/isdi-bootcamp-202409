import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { todayDate } } = req

    return logic.getCurrentReminders(userId, todayDate).then(currentReminders => res.json(currentReminders))
})