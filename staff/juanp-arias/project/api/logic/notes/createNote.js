import { User, Note } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, text) => {
    validate.id(userId)
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Note.create({ author: userId, text })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}