import { User, Reminder } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, title, text, date) => {
    validate.id(userId)
    validate.text(title)
    validate.text(text)
    validate.date(new Date(date))
    return User.findById(userId)
        .catch(error => {
            throw new SystemError(error.message)
        })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            return Reminder.create({ title, text, date })
                .then(reminder => {
                    user.reminders.push(reminder)
                    return user.save()
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}
