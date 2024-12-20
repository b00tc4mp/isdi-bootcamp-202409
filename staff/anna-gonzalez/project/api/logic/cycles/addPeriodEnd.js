import { User, Cycle } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError, ValidationError, DuplicityError } = errors

export default (userId, periodEnd) => {
    validate.id(userId, 'userId')
    validate.date(periodEnd)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            const normalizedPeriodEnd = new Date(periodEnd)

            if (normalizedPeriodEnd.toISOString() > new Date().toISOString()) throw new ValidationError('End of period cannot be created in the future')

            return Cycle.findOne({ user: userId, start: { $lte: periodEnd } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(searchedCycle => {
                    if (!searchedCycle) throw new NotFoundError('Cycle not found')

                    const normalizedSearchCyclePeriodEnd = new Date(searchedCycle.periodEnd)

                    if (normalizedSearchCyclePeriodEnd.getTime() === normalizedPeriodEnd.getTime()) {
                        throw new DuplicityError('Period end already set on this day')
                    }

                    return Cycle.updateOne(searchedCycle, { periodEnd: periodEnd }, { new: true })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(_ => { })
}