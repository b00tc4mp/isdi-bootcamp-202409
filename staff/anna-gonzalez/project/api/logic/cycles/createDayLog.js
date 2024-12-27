import { User, Cycle, DayLog } from 'dat'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, formattedDate, formData) => {
    validate.id(userId, 'userId')
    validate.date(formattedDate)
    validate.data(formData)

    const normalizedFormattedDate = new Date(formattedDate).toISOString()

    const cycleDate = new Date(normalizedFormattedDate)
    cycleDate.setDate(cycleDate.getDate() + 1)

    const normalizedCycleDate = new Date(cycleDate).toISOString()

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')
            if (normalizedFormattedDate > new Date().toISOString()) {
                throw new ValidationError('DayLog cannot be created in the future')
            }

            return Cycle.findOne({ user: userId, start: { $lte: normalizedCycleDate } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(cycle => {
                    if (!cycle) throw new NotFoundError('Cycle not found')

                    const existingDayLogIndex = cycle.dayLogs.findIndex(log => new Date(log.date).toISOString() === normalizedFormattedDate)

                    if (existingDayLogIndex !== -1) {
                        const existingDayLog = cycle.dayLogs[existingDayLogIndex].toObject()

                        existingDayLog.symptoms = formData.symptoms
                        existingDayLog.mood = formData.mood
                        existingDayLog.flow = formData.flow
                        existingDayLog.sleep = formData.sleep
                        existingDayLog.sexualActivity = formData.sexualActivity
                        existingDayLog.sexualEnergy = formData.sexualEnergy
                        existingDayLog.date = formattedDate

                        cycle.dayLogs[existingDayLogIndex] = existingDayLog

                        return cycle.save()
                            .catch(error => { throw new SystemError(error.message) })
                    } else {
                        const dayLog = new DayLog({
                            date: formattedDate,
                            symptoms: formData.symptoms,
                            mood: formData.mood,
                            flow: formData.flow,
                            sleep: formData.sleep,
                            sexualActivity: formData.sexualActivity,
                            sexualEnergy: formData.sexualEnergy
                        })

                        cycle.dayLogs.push(dayLog)

                        return cycle.save()
                            .catch(error => { throw new SystemError(error.message) })
                    }
                })
        })
        .then(_ => { })
}