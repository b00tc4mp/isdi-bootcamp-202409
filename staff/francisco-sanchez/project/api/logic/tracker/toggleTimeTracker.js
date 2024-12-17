import { Activity, Pack, User } from "dat";

import { validate, errors } from "com";

const { SystemError, NotFoundError, OwnershipError, ValidationError } = errors

export default (userId, packId, customerId, description, timerActivated, remmainingQuantity) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')

    return Pack.findById(packId)
        .catch(error => { throw new SystemError(error.message) })
        .then(pack => {
            const invalidStatuses = {
                Finished: 'This pack has already been completed and cannot be used',
                Pending: 'This pack is pending to confirm with customer.',
                Expired: 'This pack has expired and cannot be accessed.'
            };

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
                throw new ValidationError(invalidStatuses[pack.status])
            }

            if (expiryDat <= currentDate && !invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has expired and cannot be accessed.')
                //Y además por aquí debería cambiar el status a Expired
            }


            if (!timerActivated === null) {
                //Aquí empezaremos la lógica del timer
                return Pack.findByIdAndUpdate(packId, { timerActivated, descriptionActivityTemp }, { new: true, runValidators: true })

            } else {
                //Aquí detendremos la lógica del timer
                //Borraremos las variables temporales
                //Calcularemos el tiempo transcurrido entre timerActivated y la fecha/hora actual y actualizaremos Activity

            }



        })
}