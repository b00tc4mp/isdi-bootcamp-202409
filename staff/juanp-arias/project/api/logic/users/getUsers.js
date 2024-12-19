import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.find({ role: 'student' }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(users => {
            if (!users || users.length === 0) throw new NotFoundError('No students found')

            users.forEach(user => {
                user.id = user._id.toString()
                delete user._id
                delete user.password
                delete user.reminders
            })

            return users
        })
}