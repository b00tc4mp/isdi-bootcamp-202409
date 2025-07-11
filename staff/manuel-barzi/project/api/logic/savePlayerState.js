import { validate, errors } from 'com'
import { User } from 'dat'

const { SystemError, NotFoundError } = errors

export default (userId, x, y) => {
    validate.id(userId)
    // TODO validate x is a number
    // TODO validate y is a number

    return User.findByIdAndUpdate(userId, { coords: { x, y } })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
        })
}