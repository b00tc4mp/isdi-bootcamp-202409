import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, params: { formattedDate }, body: { title } } = req

    return logic.createReminder(userId, formattedDate, title).then(() => res.status(201).send())
})