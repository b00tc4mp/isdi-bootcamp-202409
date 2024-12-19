import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors
export default (userId, date) => {
    validate.id(userId, 'userId')
    validate.date(new Date(date))

    return (async () => {
        let user

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) throw new NotFoundError('user not found')

        const reminders = user.reminders.filter(reminder => {
            const reminderDate = new Date(reminder.date).toDateString()
            const queryDate = new Date(date).toDateString()
            return reminderDate === queryDate
        })
            .map(reminder => {
                reminder.id = reminder._id.toString()
                delete reminder._id
                return reminder
            })

        return reminders
    })()
}