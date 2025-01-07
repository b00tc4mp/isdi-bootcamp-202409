import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { reminderId } } = req

    return logic.deleteReminder(userId, reminderId).then(() => res.status(204).send())
})