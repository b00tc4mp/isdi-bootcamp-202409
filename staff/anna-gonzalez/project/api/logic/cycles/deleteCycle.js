import { User, Cycle } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError, ValidationError, DuplicityError } = errors

export default (userId, start) => {
    validate.id(userId, 'userId')
    validate.date(start)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            const normalizedStart = new Date(start)

            return Cycle.findOne({ user: userId, start: { $lte: start } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(cycleToDelete => {
                    if (!cycleToDelete) throw new NotFoundError('Cycle not found')

                    return Cycle.findOne({ user: userId, start: { $lt: cycleToDelete.start } })
                        .sort({ start: -1 })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(previousCycle => {
                            return Cycle.findOne({ user: userId, start: { $gt: start } })
                                .sort({ start: 1 })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(nextCycle => {
                                    if (previousCycle) {
                                        const previousCycleEnd = new Date(cycleToDelete.start)
                                        previousCycleEnd.setDate(previousCycleEnd.getDate() - 1)

                                        return Cycle.updateOne(
                                            { _id: previousCycle._id },
                                            { end: previousCycleEnd.toISOString() },
                                            { new: true }
                                        )
                                            .catch(error => { throw new SystemError(error.message) })
                                            .then(() => {
                                                // Ajuste del ciclo siguiente
                                                if (nextCycle) {
                                                    const nextCycleEnd = new Date(cycleToDelete.start)
                                                    nextCycleEnd.setDate(nextCycleEnd.getDate() - 1)

                                                    return Cycle.updateOne(
                                                        { _id: nextCycle._id },
                                                        { end: nextCycleEnd.toISOString() },
                                                        { new: true }
                                                    )
                                                        .catch(error => { throw new SystemError(error.message) })
                                                }
                                            })
                                    }

                                    if (nextCycle) {
                                        const nextCycleEnd = new Date(cycleToDelete.start)
                                        nextCycleEnd.setDate(nextCycleEnd.getDate() - 1)

                                        return Cycle.updateOne(
                                            { _id: nextCycle._id },
                                            { end: nextCycleEnd.toISOString() },
                                            { new: true }
                                        )
                                            .catch(error => { throw new SystemError(error.message) })
                                    }
                                })
                        })
                })
                .then(() => {
                    return Cycle.deleteOne({ _id: cycleToDelete._id })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(_ => { })
}