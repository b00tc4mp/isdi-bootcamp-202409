import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId, body: { text } } = req

    return logic.createNote(userId, text).then(() => res.status(201).send())
})