import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors
export default (userId, noteId) => {
    validate.id(userId, 'userId')
    validate.id(noteId, 'noteId')

    return Promise.all([User.findById(userId).lean(), Note.findById(noteId).lean()])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, note]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!note) throw new NotFoundError('note not found')
            if (!note.author.equals(userId)) throw new OwnershipError('user is not author of note')

            return Note.findByIdAndDelete(noteId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}