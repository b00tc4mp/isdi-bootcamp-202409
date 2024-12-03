import { User, Cycle } from 'dat'

import { validate, errors } from 'com'
const { SystemError, NotFoundError } = errors

export default (userId, cycleId, periodEnd) => {
    validate.id(userId, 'userId')
    validate.id(cycleId, 'cycleId') //esto no lo recibo
    validate.date(periodEnd)

    //traerme el ciclo que esté en el start más cercano a ese end period
    //si no tiene endperiod, se lo pongo
    //si tiene, lo updateo

    //impedir que puedan volver añadir un addperiod en los siguientes 3dias
    //crear un error personalizado para ello Not Possible

    return Promise.all([
        User.findById(userId).lean(),
        Cycle.findById(cycleId) //buscar por fecha instead
    ])
        //si tu regla lleva 3 dias no puedes empezar otro ciclo
        //si sta cerca, update
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, cycle]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!cycle) throw new NotFoundError('Cycle not found')

            cycle.periodEnd = periodEnd

            return cycle.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(_ => { })
}