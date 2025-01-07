import { User, Reminder } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, title, text, date) => {
    validate.id(userId)
    validate.text(title)
    validate.text(text)
    validate.date(new Date(date))

    const reminderDate = new Date(date)
    const now = new Date()

    const reminderDateOnly = new Date(reminderDate.getFullYear(), reminderDate.getMonth(), reminderDate.getDate())
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    if (reminderDateOnly < today) { throw new SystemError('Cannot create reminders for past dates.') }

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Reminder.create({ title, text, date })
                .catch(error => { throw new SystemError(error.message) })
                .then(reminder => {
                    user.reminders.push(reminder)
                    return user.save()
                })
        })
}