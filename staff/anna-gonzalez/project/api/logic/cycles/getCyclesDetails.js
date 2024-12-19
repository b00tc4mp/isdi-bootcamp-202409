import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.find({ user: userId }).sort({ start: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(cycles => {
                    if (cycles.length === 0) throw new NotFoundError('Cycle not found')

                    const cycleDetails = []

                    cycles.forEach(cycle => {
                        const { start, end, periodEnd, dayLogs } = cycle

                        dayLogs.forEach(dayLog => {
                            dayLog.id = dayLog._id.toString()
                            delete dayLog._id
                        })

                        cycleDetails.push({ start, end, periodEnd, dayLogs })
                    })

                    return cycleDetails
                })
        })
}