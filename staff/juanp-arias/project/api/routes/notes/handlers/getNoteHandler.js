import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { userId } = req
    const { noteId } = req.params
    return logic.getNote(userId, noteId).then(note => res.json(note))
})