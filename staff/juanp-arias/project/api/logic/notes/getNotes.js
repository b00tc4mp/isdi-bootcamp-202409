import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return Promise.all([
        User.findById(userId).lean(),
        Note.find().populate('author', 'name').sort({ date: -1 }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, notes]) => {
            if (!user) throw new NotFoundError('user not found')

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
}