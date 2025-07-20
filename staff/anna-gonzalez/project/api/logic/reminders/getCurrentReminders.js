import { User, Reminder } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, todayDate) => {
    validate.id(userId, 'userId')
    validate.date(todayDate)

    const normalizedDate = new Date(todayDate).toISOString()

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Reminder.find({ user: userId, date: normalizedDate }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(reminders => {

                    reminders.forEach(reminder => {
                        reminder.id = reminder._id.toString()
                        delete reminder._id
                    })

                    return reminders
                })
        })
}