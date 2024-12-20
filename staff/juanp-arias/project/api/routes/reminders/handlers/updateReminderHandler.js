import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    console.log('hola')
    console.log(req.body)
    const { params: { reminderId }, body: { title, text, date } } = req
    return logic.updateReminder(userId, reminderId, title, text, date)
        .then(() => res.status(201).send())
})