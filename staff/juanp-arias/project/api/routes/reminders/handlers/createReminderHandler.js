import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { title, text, date } } = req

    return logic.createReminder(userId, title, text, date).then(() => res.status(201).send())
})