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

            return Note.findByIdAndUpdate(noteId, { text }, { new: true, runValidators: true })//new: true(devuelve el documento actualizado), runValidators: true(ejecuta validaciones del esquema antes de actualizar sus datos)
                .catch(error => { throw new SystemError(error.message) })
        })
}