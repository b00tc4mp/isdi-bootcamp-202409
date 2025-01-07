import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Note.findOne({ author: userId })
                .sort({ date: -1 })
                .lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(note => {
            if (!note) return null
            note.id = note._id.toString()
            delete note._id

            return note
        })
}