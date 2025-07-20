import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { reminderId } = req.params
    return logic.editReminder(userId, reminderId).then(reminder => res.json(reminder))
})