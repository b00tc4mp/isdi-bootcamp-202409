import { User, Cycle, DayLog } from 'dat'
import { validate, errors } from 'com'
const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, selectedDay, dayLogData) => {
    validate.id(userId, 'userId')
    validate.date(selectedDay)
    //validate.dayLog(dayLogData)

    const normalizedSelectedDay = new Date(selectedDay)

    if (normalizedSelectedDay.toISOString() > new Date().toISOString()) {
        throw new ValidationError('DayLog cannot be created in the future')
    }

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.findOne({
                start: { $lte: normalizedSelectedDay },
                $or: [{ end: { $gte: normalizedSelectedDay } }, { end: null }]
            })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(searchedCycle => {
                    if (!searchedCycle) throw new NotFoundError('Cycle not found')

                    //check if there is a daylog on this date
                    const existingDayLog = searchedCycle.dayLogs.find(dayLog =>
                        new Date(dayLog.date).toDateString() === normalizedSelectedDay.toDateString()
                    )

                    if (existingDayLog) {

                        return DayLog.findByIdAndUpdate(existingDayLog._id, dayLogData, { new: true })
                            .catch(error => { throw new SystemError(error.message) })
                    } else {

                        return DayLog.create({ user: userId, date: normalizedSelectedDay, ...dayLogData })
                            .catch(error => { throw new SystemError(error.message) })
                            .then(newDayLog => {
                                searchedCycle.dayLogs.push(newDayLog._id)
                                return searchedCycle.save()
                                    .catch(error => { throw new SystemError(error.message) })
                                    .then(() => newDayLog)
                            })
                    }
                })
        })
}