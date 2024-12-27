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
                    const periodDays = []

                    cycles.forEach(cycle => {
                        const { start, periodEnd } = cycle

                        if (start && periodEnd) {
                            let normalizedStart = new Date(start)

                            while (normalizedStart <= new Date(periodEnd)) { //check if current cycle is part of current month
                                periodDays.push(normalizedStart.toISOString())

                                normalizedStart.setDate(normalizedStart.getDate() + 1)
                            }
                        }

                        if (start && !periodEnd) {
                            let normalizedStart = new Date(start)

                            periodDays.push(normalizedStart.toISOString())

                            normalizedStart.setDate(normalizedStart.getDate() + 1)
                        }
                    })

                    return periodDays
                })
        })
}