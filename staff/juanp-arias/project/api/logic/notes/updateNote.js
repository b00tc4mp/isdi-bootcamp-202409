import { Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (noteId, text) => {
    validate.id(noteId, 'noteId')
    validate.text(text)

    return Note.findById(noteId)
        .catch(error => { throw new SystemError(error.message) })
        .then(note => {
            if (!note) throw new NotFoundError('note not found')

            return Note.findByIdAndUpdate(noteId, { text }, { new: true, runValidators: true })
                .catch(error => { throw new SystemError(error.message) })
        })
}