import { User, Reminder } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, reminderId) => {
    validate.id(userId, 'userId')
    validate.id(reminderId, 'reminderId')

    return Promise.all([
        User.findById(userId),
        Reminder.findById(reminderId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, reminder]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!reminder) throw new NotFoundError('reminder not found')

            return Reminder.findByIdAndDelete(reminderId)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => {
                    if (user.reminders.length > 0) {
                        user.reminders = user.reminders.filter(reminder => {
                            return reminder._id.toString() !== reminderId
                        })
                        return user.save()
                    } else { throw new NotFoundError('reminder not found') }
                })
        })
}