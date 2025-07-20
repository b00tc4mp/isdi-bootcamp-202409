import { User, Reminder } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, reminderId, title, text, date) => {
    validate.id(userId, 'userId')
    validate.id(reminderId, 'reminderId')
    validate.text(title)
    validate.text(text)
    validate.date(new Date(date))

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Reminder.findByIdAndUpdate(
                reminderId,
                { title, text, date },
                { new: true, runValidators: true }
            )
                .catch(error => { throw new SystemError(error.message) })
                .then(updatedReminder => {
                    if (!updatedReminder) throw new NotFoundError('Reminder not found')

                    const reminderIndex = user.reminders.findIndex(reminder => reminder._id.toString() === reminderId)

                    if (reminderIndex !== -1) {
                        user.reminders[reminderIndex] = updatedReminder
                    } else {
                        throw new NotFoundError('Reminder not found in user')
                    }

                    return user.save().then(() => updatedReminder)
                })
        })
}