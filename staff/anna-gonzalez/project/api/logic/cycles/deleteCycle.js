import { User, Cycle } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, start) => {
    validate.id(userId, 'userId')
    validate.date(start)

    const normalizedStartDate = new Date(start).toISOString()

    const startDate = new Date(normalizedStartDate)
    startDate.setDate(startDate.getDate() + 1)

    const normalizedStart = new Date(startDate).toISOString()

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.findOne({ user: userId, start: { $lte: normalizedStart } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(cycleToDelete => {
                    if (!cycleToDelete) throw new NotFoundError('Cycle not found')

                    return Cycle.findOne({ user: userId, start: { $lt: cycleToDelete.start } })
                        .sort({ start: -1 })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(previousCycle => {
                            if (previousCycle) {

                                return Cycle.findOne({ user: userId, start: { $gt: normalizedStart } })
                                    .sort({ start: 1 })
                                    .catch(error => { throw new SystemError(error.message) })
                                    .then(nextCycle => {
                                        if (nextCycle) {
                                            const previousCycleEnd = new Date(nextCycle.start)
                                            previousCycleEnd.setDate(previousCycleEnd.getDate() - 1)

                                            return Cycle.updateOne(
                                                { _id: previousCycle._id },
                                                { end: previousCycleEnd.toISOString() },
                                                { new: true }
                                            )
                                                .catch(error => { throw new SystemError(error.message) })
                                        }
                                    })
                            }
                        })
                        .then(() => {
                            return Cycle.deleteOne({ _id: cycleToDelete._id })
                                .catch(error => { throw new SystemError(error.message) })
                        })
                })
        })
        .then(_ => { })
}