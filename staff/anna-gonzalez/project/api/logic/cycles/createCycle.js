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

            const startToDate = new Date(start)
            startToDate.setDate(startToDate.getDate())

            if (startToDate.toISOString() > new Date().toISOString()) throw new ValidationError('Cycle cannot be created in the future')

            return Cycle.findOne({ start })
                .catch(error => { throw new SystemError(error.message) })
                .then(searchedCycle => {
                    if (searchedCycle) { throw new DuplicityError('Cycle already exists') }
                })
                .then(() => {
                    return Cycle.findOne({ start: { $lt: start } })
                        .sort({ start: -1 })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(lastCycle => {
                            if (lastCycle) {
                                if ((new Date(start).getTime() - new Date(lastCycle.start).getTime()) < 604800000) {
                                    throw new ValidationError('Cycle cannot be created if a cycle was created at most 7 days ago');
                                }
                            }

                            return Cycle.findOne({ start: { $gt: start } })
                                .sort({ start: 1 })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(nextCycle => {
                                    if (nextCycle) {
                                        if ((new Date(nextCycle.start).getTime() - new Date(start).getTime()) < 604800000) {
                                            throw new ValidationError('Cycle cannot be created if a cycle starts in 7 days or less');
                                        }
                                    }

                                    return Cycle.create({ user, start })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(newCycle => {
                                            if (lastCycle) {
                                                const newCycleAdjustedStart = new Date(start)
                                                newCycleAdjustedStart.setDate(newCycleAdjustedStart.getDate() - 1)

                                                const lastCycleEndDate = new Date(newCycleAdjustedStart).toISOString()

                                                return Cycle.updateOne(lastCycle, { end: lastCycleEndDate }, { new: true })
                                                    .catch(error => { throw new SystemError(error.message) })
                                                    .then(() => {
                                                        if (nextCycle) {
                                                            const nextCycleAdjustedStart = new Date(nextCycle.start)
                                                            nextCycleAdjustedStart.setDate(nextCycleAdjustedStart.getDate() - 1)

                                                            const nextCycleEndDate = new Date(nextCycleAdjustedStart).toISOString()

                                                            return Cycle.updateOne(newCycle, { end: nextCycleEndDate }, { new: true })
                                                                .catch(error => { throw new SystemError(error.message) })
                                                        }
                                                    })
                                            }

                                            if (nextCycle && !(lastCycle)) {
                                                const nextCycleAdjustedStart = new Date(nextCycle.start)
                                                nextCycleAdjustedStart.setDate(nextCycleAdjustedStart.getDate() - 1)

                                                const nextCycleEndDate = new Date(nextCycleAdjustedStart).toISOString()

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