import { Habit } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, habitId, data) => {
    validate.id(userId, 'userId')
    validate.id(habitId, 'habitId')
    if (data.name) validate.name(data.name)
    if (data.emoji) validate.emoji(data.emoji)
    if (data.category) validate.text(data.category)
    if (data.subcategory) validate.text(data.subcategory)

    return Habit.findOne({ _id: habitId, user: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(habit => {
            if (!habit) throw new NotFoundError('Habit not found')

            Object.assign(habit, data)

            return habit.save()
                .catch(error => { throw new SystemError(error.message) })
        })
}