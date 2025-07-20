import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const reminders = user.reminders.map(reminder => {
                reminder.id = reminder._id.toString()
                delete reminder._id
                return reminder
            })

            return reminders
        })
}