import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { date } = req.params
    return logic.getRemindersByDate(userId, date).then(reminders => res.json(reminders))
})