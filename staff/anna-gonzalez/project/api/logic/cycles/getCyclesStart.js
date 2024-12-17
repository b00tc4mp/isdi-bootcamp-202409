import { User, Cycle } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId) => {
    validate.id(userId, 'userId')

    const normalizedCurrentDate = new Date()

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.find({ user: userId }).sort({ start: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(cycles => {
                    if (cycles.length === 0) throw new NotFoundError('Cycle not found')

                    const cyclesStart = []

                    cycles.forEach(cycle => {
                        const { start } = cycle

                        if (start) {
                            let normalizedStart = new Date(start)

                            cyclesStart.push(normalizedStart.toISOString())
                        }
                    })

                    return cyclesStart
                })
        })
}