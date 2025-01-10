import { Activity, BasePack, Pack, User } from 'dat';

import { validate, errors } from 'com';

import { getElapsedTime } from '../helpers/index.js';

const { SystemError, NotFoundError, OwnershipError, ValidationError } = errors

export default (userId, packId, customerId, description, timeAdjust) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')

    return Pack.findById(packId)
        .catch(error => { throw new SystemError(error.message) })
        .then(pack => {
            const invalidStatuses = ['Finished', 'Pending', 'Expired']

            const currentDate = new Date()
            const expiryDat = new Date(pack.expiryDate)

            if (!pack) {
                console.error(error.message)
                throw new NotFoundError('Pack to track not found')
            }

            if (pack.provider.toString() !== userId) {
                throw new OwnershipError('Your user is not the owner of this pack relationship')
            }

            if (invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has and invalid status to work (Finished, Pending or Expired')
            }

            if (expiryDat <= currentDate && !invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has expired and cannot be accessed.')
                //Y además por aquí debería cambiar el status a Expired
            }


            //Evaluar si el tiempo entrado es positivo o negativo

            //Si es positivo sumaremos el tiempo al pack

            //Si es negativo, lo restaremos


            //Despues de hacer el cálculo actualizaremos el disponible en pack

            //Crearemos un registro en activity con la operación realizada
        })
}