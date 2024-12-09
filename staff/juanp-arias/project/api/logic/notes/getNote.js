import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, noteId) => {
    validate.id(userId, 'userId')
    validate.id(noteId, 'noteId')
    return Promise.all([
        User.findById(userId).lean(),
        Note.findById(noteId).lean()
    ])
        .then(([user, note]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!note) throw new NotFoundError('note not found')
            if (note.author.toString() !== userId) {
                throw new OwnershipError('user does not own the note')
            }
            return note
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}
