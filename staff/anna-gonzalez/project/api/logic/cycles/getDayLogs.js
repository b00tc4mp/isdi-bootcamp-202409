import { User, DayLog } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

//             return DayLog.find({ user: userId }).sort({ start: -1 }).lean()
//                 .catch(error => { throw new SystemError(error.message) })
//                 .then(dayLogs => {
//                     if (!dayLogs) throw new NotFoundError('Daylog not found')

//                     const dayLogsHistory = []

//                     dayLogs.forEach(dayLog => {
//                         const { formattedDate, formData } = dayLog

//                         if (formattedDate && formData) {
//                             const normalizedDate = new Date(formattedDate)

//                             dayLogsHistory.push(normalizedDate.toISOString())
//                         }

//                         if (formattedDate && !formData) {
//                             const normalizedDate = new Date(formattedDate)

//                             dayLogsHistory.push(normalizedDate.toISOString())
//                         }
//                     })

//                     return dayLogsHistory
//                 })
//         })
// }