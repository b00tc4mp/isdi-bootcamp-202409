import { User, Cycle, DayLog } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, formattedDate) => {
    validate.id(userId, 'userId')
    validate.date(formattedDate)

    const normalizedFormattedDate = new Date(formattedDate)

    const cycleDate = new Date(normalizedFormattedDate)
    cycleDate.setDate(cycleDate.getDate() + 1)

    const normalizedCycleDate = new Date(cycleDate).toISOString()

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.findOne({ user: userId, start: { $lte: normalizedCycleDate } }).sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(cycle => {
                    if (!cycle) throw new NotFoundError('Cycle not found')

                    const foundLog = cycle.dayLogs.find(log => {
                        const logDate = new Date(log.date)
                        return logDate.toISOString() === normalizedFormattedDate.toISOString()
                    })

                    if (foundLog) {
                        foundLog.id = foundLog._id.toString()
                        delete foundLog._id

                        return foundLog
                    }

                    if (!foundLog) {
                        const newDayLog = new DayLog({ date: normalizedFormattedDate })

                        cycle.dayLogs.push(newDayLog)

                        return cycle.save()
                            .catch(error => { throw new SystemError(error.message) })
                            .then(updatedCycle => {
                                if (updatedCycle) {
                                    updatedCycle.id = updatedCycle._id.toString()
                                    delete updatedCycle._id

                                    return updatedCycle.dayLogs[updatedCycle.dayLogs.length - 1]
                                }
                            })
                    }
                })
        })
}