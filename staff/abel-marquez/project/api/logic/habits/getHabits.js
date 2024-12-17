import { Habit, User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')
    console.log('Buscando hábitos para userId:', userId)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Habit.find({ user: userId }).lean()
        })
        .catch(error => { throw new SystemError(error.message) })
}