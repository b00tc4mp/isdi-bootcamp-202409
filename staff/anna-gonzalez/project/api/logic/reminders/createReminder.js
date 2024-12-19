import { User, Reminder } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, formattedDate, title) => {
    validate.id(userId, 'userId')
    validate.date(formattedDate)
    validate.text(title)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            const normalizedDate = new Date(formattedDate)
            normalizedDate.setDate(normalizedDate.getDate() + 2)

            const reminderDate = new Date(normalizedDate).toISOString()

            if (reminderDate <= new Date().toISOString()) throw new ValidationError('Reminder cannot be created in the past')

            return Reminder.create({ user: userId, date: formattedDate, title })
        })
        .then(_ => { })
}