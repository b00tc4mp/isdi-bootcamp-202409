import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

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

            note.id = note._id.toString()
            delete note._id
            return note
        })
        .catch(error => {
            if (error instanceof NotFoundError || error instanceof OwnershipError) throw error
            throw new SystemError(error.message)
        })
}