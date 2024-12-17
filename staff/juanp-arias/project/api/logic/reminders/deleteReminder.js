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
        .then(([user, reminder]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!reminder) throw new NotFoundError('reminder not found')

            return Reminder.findByIdAndDelete(reminderId)
                .then(() => {
                    return User.findByIdAndUpdate(
                        userId,
                        { $pull: { reminders: reminderId } },
                        { new: true }
                    )
                })
        })
        .catch(error => {
            if (error instanceof NotFoundError) throw error
            throw new SystemError(error.message)
        })
}