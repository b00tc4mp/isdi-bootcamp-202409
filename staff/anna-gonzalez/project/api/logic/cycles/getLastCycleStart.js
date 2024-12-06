import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.findOne({ user: userId }).sort({ start: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(lastCycle => {
                    if (!lastCycle) throw new NotFoundError('Cycle not found')

                    return lastCycle.start
                })
        })
}