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

            const adjustedStart = new Date(start)
            adjustedStart.setDate(adjustedStart.getDate() - 1)

            if (adjustedStart.toISOString() > new Date().toISOString()) throw new ValidationError('Cycle cannot be created in the future')

            return Cycle.findOne({ start })
                .catch(error => { throw new SystemError(error.message) })
                .then(searchedCycle => {
                    if (searchedCycle) { throw new DuplicityError('Cycle already exists') }
                })
                .then(() => {
                    return Cycle.findOne({ start: { $lt: start } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(lastCycle => {
                            return Cycle.findOne({ start: { $gt: start } })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(nextCycle => {
                                    if (lastCycle && nextCycle) {
                                        if ((new Date(nextCycle.start).getTime() - new Date(start).getTime()) < 604800000) {
                                            throw new ValidationError('Cycle cannot be created if a cycle starts in 7 days or less');
                                        }
                                    }

                                    if (lastCycle && !nextCycle) {
                                        if ((new Date(start).getTime() - new Date(lastCycle.start).getTime()) < 604800000) {
                                            throw new ValidationError('Cycle cannot be created if a cycle was created at most 7 days ago');
                                        }
                                    }

                                    if (!lastCycle && nextCycle) {
                                        if ((new Date(nextCycle.start).getTime() - new Date(start).getTime()) < 604800000) {
                                            throw new ValidationError('Cycle cannot be created if a cycle starts in 7 days or less');
                                        }
                                    }

                                    return Cycle.create({ user, start })
                                        .catch(error => { throw new SystemError(error.message) })
                                        .then(newCycle => {

                                            if (lastCycle && nextCycle) {
                                                const lastCycleEndDate = new Date(start).toISOString()

                                                return Cycle.updateOne(lastCycle, { end: lastCycleEndDate }, { new: true })
                                                    .catch(error => { throw new SystemError(error.message) })
                                            }

                                            if (lastCycle && !nextCycle) {
                                                const lastCycleEndDate = new Date(start).toISOString()

                                                return Cycle.updateOne(lastCycle, { end: lastCycleEndDate }, { new: true })
                                                    .catch(error => { throw new SystemError(error.message) })
                                            }

                                            if (!lastCycle && nextCycle) {
                                                const nextCycleEndDate = new Date(nextCycle.start).toISOString()

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