import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, formattedDate) => {
    validate.id(userId, 'userId')
    validate.id(formattedDate)

    const normalizedFormattedDate = new Date(formattedDate)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.find({ user: userId }).sort({ start: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(cycles => {
                    if (!cycles) throw new NotFoundError('Cycle not found')

                    const dayLogsFound = []

                    cycles.forEach(cycle => {
                        if (cycle.dayLogs && cycle.dayLogs.length > 0) {
                            cycle.dayLogs.forEach(log => {
                                log.id = log._id.toString()
                                delete log._id
                                dayLogsFound.push(log)
                            })
                        }
                    })

                    //filter of daylogs if one of them is already set on this date
                    const filteredDayLogs = dayLogsFound.filter(log => {
                        const logDate = new Date(log.date)

                        return logDate.toISOString() === normalizedFormattedDate.toISOString()
                    })

                    return filteredDayLogs
                })
        })
}