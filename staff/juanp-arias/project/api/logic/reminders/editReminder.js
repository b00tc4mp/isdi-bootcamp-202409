import { User, Reminder } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, reminderId) => {
    validate.id(userId, 'userId')
    validate.id(reminderId, 'reminderId')
    return Promise.all([
        User.findById(userId).lean(),
        Reminder.findById(reminderId).lean()
    ])
        .then(([user, reminder]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!reminder) throw new NotFoundError('reminder not found')
            reminder.id = reminder._id.toString()
            delete reminder._id
            return reminder
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}