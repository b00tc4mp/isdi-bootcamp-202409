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

            const periodEndToDate = new Date(periodEnd)
            periodEndToDate.setDate(periodEndToDate.getDate())

            if (periodEndToDate.toISOString() > new Date().toISOString()) throw new ValidationError('End of period cannot be created in the future')

            return Cycle.findOne({ start: { $lte: periodEnd } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(searchedCycle => {
                    if (!searchedCycle) throw new NotFoundError('Cycle not found')
                    if (searchedCycle.periodEnd) {
                        const searchedCyclePeriodEnd = new Date(searchedCycle.periodEnd).toISOString()
                        if (searchedCyclePeriodEnd === periodEndToDate.toISOString()) {
                            throw new DuplicityError('Period end already set on this day')
                        }
                    }

                    return Cycle.updateOne(searchedCycle, { periodEnd: periodEnd }, { new: true })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(_ => { })
}