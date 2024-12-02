import { User, Cycle } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, cycleId, periodEnd) => {
    validate.id(userId, 'userId')
    validate.id(cycleId, 'cycleId')
    validate.date(periodEnd)

    return Promise.all([
        User.findById(userId).lean(),
        Cycle.findById(cycleId)
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, cycle]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!cycle) throw new NotFoundError('Cycle not found')

            cycle.periodEnd = periodEnd

            return cycle.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}