import { User, Cycle } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, periodEnd) => {
    validate.id(userId, 'userId')
    validate.date(periodEnd)

    //añadir q no se pueda añadir fin de periodos en el futuro de la fecha actual (custom error)
    //impedir que puedan volver añadir un addperiod en los siguientes 7 dias (custom error: NotAllowed?)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Cycle.findOne({ start: { $lt: periodEnd } })
                .sort({ start: -1 })
                .catch(error => { throw new SystemError(error.message) })
                .then(cycle => {
                    if (!cycle) throw new NotFoundError('Cycle not found')

                    return Cycle.updateOne(cycle, { periodEnd: periodEnd }, { new: true })
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
        .then(_ => { })
}