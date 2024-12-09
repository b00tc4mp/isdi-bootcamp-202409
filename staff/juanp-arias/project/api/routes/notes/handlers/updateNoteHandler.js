import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
    const { params: { noteId }, body: { text } } = req
    return logic.updateNote(noteId, text)
        .then(() => res.status(201).send())
})