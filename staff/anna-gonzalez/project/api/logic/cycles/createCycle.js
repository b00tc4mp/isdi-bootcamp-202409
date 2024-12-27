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

            if (normalizedStart.toISOString() > new Date().toISOString()) throw new ValidationError('Cycle cannot be created in the future')

            return Cycle.findOne({ user: userId, start })
                .catch(error => { throw new SystemError(error.message) })
                .then(searchedCycle => {
                    if (searchedCycle) { throw new DuplicityError('Cycle already exists') }
                })
                .then(() => {
                    return Cycle.findOne({ user: userId, start: { $lt: start } })
                        .sort({ start: -1 })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(lastCycle => {
                            if (lastCycle) {
                                if ((normalizedStart.getTime() - new Date(lastCycle.start).getTime()) < 604800000) {
                                    throw new ValidationError('Cycle cannot be created if a cycle was created at most 7 days ago')
                                }
                            }

                            return Cycle.findOne({ user: userId, start: { $gt: start } })
                                .sort({ start: 1 })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(nextCycle => {

                                    if (nextCycle) {
                                        const normalizedNextCycleStart = new Date(nextCycle.start)

                                        if ((normalizedNextCycleStart.getTime() - normalizedStart.getTime()) < 604800000) {
                                            throw new ValidationError('Cycle cannot be created if a cycle starts in 7 days or less')
                                        }
                                    }

                                    return Cycle.create({ user: userId, start })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(newCycle => {
                                            if (lastCycle) {
                                                const normalizedNewCycleStart = new Date(start)

                                                normalizedNewCycleStart.setDate(normalizedNewCycleStart.getDate() - 1)

                                                const lastCycleEndDate = new Date(normalizedNewCycleStart).toISOString()

                                                return Cycle.updateOne(lastCycle, { end: lastCycleEndDate }, { new: true })
                                                    .catch(error => { throw new SystemError(error.message) })
                                                    .then(() => {
                                                        if (nextCycle) {
                                                            const normalizedNextCycleStart = new Date(nextCycle.start)
                                                            normalizedNextCycleStart.setDate(normalizedNextCycleStart.getDate() - 1)

                                                            const nextCycleEndDate = new Date(normalizedNextCycleStart).toISOString()

                                                            return Cycle.updateOne(newCycle, { end: nextCycleEndDate }, { new: true })
                                                                .catch(error => { throw new SystemError(error.message) })
                                                        }
                                                    })
                                            }

                                            if (nextCycle && !(lastCycle)) {
                                                const normalizedNextCycleStart = new Date(nextCycle.start)

                                                normalizedNextCycleStart.setDate(normalizedNextCycleStart.getDate() - 1)

                                                const nextCycleEndDate = new Date(normalizedNextCycleStart).toISOString()

                                                return Cycle.updateOne(newCycle, { end: nextCycleEndDate }, { new: true })
                                                    .catch(error => { throw new SystemError(error.message) })
                                            }
                                        })
                                })
                        })
                })
        })
        .then(_ => { })
}