import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Note.find({ author: userId })
                .populate('author', 'name')
                .sort({ date: -1 })
                .lean()
        })
        .then(notes => {
            notes.forEach(note => {
                note.id = note._id.toString()
                delete note._id

                if (note.author._id) {
                    note.author.id = note.author._id.toString()
                    delete note.author._id
                }
            })
            return notes
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}
