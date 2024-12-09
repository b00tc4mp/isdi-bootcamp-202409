import { User, Cycle, DayLog } from 'dat'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, formattedDate, formData) => {
    validate.id(userId, 'userId')
    validate.date(formattedDate)
    validate.data(formData)

    const normalizedFormattedDate = new Date(formattedDate)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')
            if (normalizedFormattedDate.toISOString() > new Date().toISOString()) {
                throw new ValidationError('DayLog cannot be created in the future')
            }

            return Cycle.findOne({
                start: { $lte: normalizedFormattedDate },
                $or: [{ end: { $gte: normalizedFormattedDate } }, { end: null }]
            })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(cycle => {
                    if (!cycle) throw new NotFoundError('Cycle not found')

                    //esto es un if
                    const existingDayLog = cycle.dayLogs.find(log => new Date(log.date).toISOString() === normalizedFormattedDate.toISOString())

                    if (existingDayLog) throw new ValidationError('DayLog already exists on this day')

                    const dayLog = new DayLog({
                        date: formattedDate,
                        symptoms: formData.symptoms,
                        mood: formData.mood,
                        energy: formData.energy,
                        flow: formData.flow,
                        sleep: formData.sleep,
                        sexualActivity: formData.sexualActivity,
                        sexualEnergy: formData.sexualEnergy
                    })

                    cycle.dayLogs.push(dayLog)

                    return cycle.save()
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(_ => { })
}