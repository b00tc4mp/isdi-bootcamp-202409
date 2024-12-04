import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, currentDate) => {
    validate.id(userId, 'userId')
    validate.date(currentDate)

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.find({ user: userId }).sort({ start: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(cycles => {
                    if (cycles.length === 0) return []

                    const currentMonthDays = []

                    cycles.forEach(cycle => {
                        const { start, periodEnd } = cycle

                        if (start && periodEnd) {
                            let startDate = new Date(start)

                            while (startDate <= new Date(periodEnd)) { //check if current cycle is part of current month
                                if (startDate >= startOfMonth && startDate <= endOfMonth) {
                                    currentMonthDays.push(startDate.toISOString().split('T')[0]) //YYYY-MM-DD format
                                }
                                startDate.setDate(startDate.getDate() + 1) //go to the next day
                            }
                        }
                    })

                    return currentMonthDays
                })
        })
}