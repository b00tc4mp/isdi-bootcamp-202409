import { Habit, Progress } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, habitId, status) => {
    validate.id(userId,'userId')
    validate.id(habitId,'habitId')
    validate.text(status)

    if (!['done', 'missed', 'half-done'].includes(status)) {
        throw new ValidationError('Invalid status')
    }

    return Habit.findOne({ _id: habitId, user: userId }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(habit => {
            if (!habit) throw new NotFoundError('Habit not found')

            const progress = new Progress({
                date: new Date(),
                status,
                habit: habitId
            })

            return progress.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(savedProgress => savedProgress)
}