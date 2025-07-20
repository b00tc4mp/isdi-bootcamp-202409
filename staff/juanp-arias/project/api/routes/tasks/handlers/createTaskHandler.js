import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { groupId, date, text } } = req

    return logic.createTask(userId, groupId, date, text).then(() => res.status(201).send())
})