import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, currentDate) => {
    validate.id(userId, 'userId')
    validate.date(currentDate)

    const normalizedCurrentDate = new Date(currentDate)
    const startOfMonth = new Date(normalizedCurrentDate.getFullYear(), normalizedCurrentDate.getMonth(), 1)
    const endOfMonth = new Date(normalizedCurrentDate.getFullYear(), normalizedCurrentDate.getMonth() + 1, 0)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.find({ user: userId }).sort({ start: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(cycles => {
                    if (!cycles) throw new NotFoundError('Cycle not found')

                    const periodDays = []

                    cycles.forEach(cycle => {
                        const { start, periodEnd } = cycle

                        if (start && periodEnd) {
                            let normalizedStart = new Date(start)

                            while (normalizedStart <= new Date(periodEnd)) { //check if current cycle is part of current month
                                if (normalizedStart >= startOfMonth && normalizedStart <= endOfMonth) {
                                    periodDays.push(normalizedStart.toISOString())
                                }
                                normalizedStart.setDate(normalizedStart.getDate() + 1)
                            }
                        }

                        if (start && !periodEnd) {
                            let normalizedStart = new Date(start)

                            if (normalizedStart >= startOfMonth && normalizedStart <= endOfMonth) {
                                periodDays.push(normalizedStart.toISOString())
                            }
                            normalizedStart.setDate(normalizedStart.getDate() + 1)
                        }
                    })

                    return periodDays
                })
        })
}