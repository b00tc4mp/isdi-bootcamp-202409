import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Note.findOne({ author: userId })
                .sort({ date: -1 })
                .lean()
        })
        .then(note => {
            if (!note) {
                return null
            }
            note.id = note._id.toString()
            delete note._id
            return note
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}