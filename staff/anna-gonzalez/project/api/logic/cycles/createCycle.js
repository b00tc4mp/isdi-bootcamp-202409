import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, start) => {
    validate.id(userId, 'userId')
    validate.date(start)

    //what happens if new cycle is very old (it needs to set an end cycle as well)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.findOne({ start: { $lte: start } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(lastCycle => {
                    if (lastCycle) {
                        const endDate = new Date(start)
                        endDate.setDate(endDate.getDate() - 1)

                        return Cycle.updateOne(lastCycle, { end: endDate }, { new: true })
                            .catch(error => { throw new SystemError(error.message) })
                    }
                })
                .then(() => {
                    return Cycle.create({ user, start })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(_ => { })
}