import { Activity, Pack, User } from 'dat' // Importamos User para validar que existe

import { validate, errors } from 'com'

import checkPackAndUpdate from '../packs/checkPackAndUpdate.js'

const { SystemError, NotFoundError, OwnershipError, ValidationError, DataIntegrityError } = errors

export default (userId, packId, customerId, description, unitsAdjust) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')
    validate.integerNum(unitsAdjust)
    validate.description(description)

    const defaultDescription = 'No description'
    if (description === undefined || description === '') {
        description = defaultDescription
    }

    // Validamos si el usuario existe
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then((user) => {
            if (!user) throw new NotFoundError('user not found')

            return Pack.findById(packId)
                .then((pack) => {
                    if (!pack) {
                        throw new NotFoundError('Pack to track not found')
                    }

                    const invalidStatuses = ['Finished', 'Pending', 'Expired']
                    const currentDate = new Date()
                    const expiryDate = new Date(pack.expiryDate)

                    if (pack.provider.toString() !== userId) {
                        throw new OwnershipError('Your user is not the owner of this pack relationship')
                    }

                    if (invalidStatuses.includes(pack.status)) {
                        throw new ValidationError('This pack has an invalid status to work (Finished, Pending or Expired)')
                    }

                    if (expiryDate <= currentDate && !invalidStatuses.includes(pack.status)) {
                        throw new ValidationError('This pack has expired and cannot be used anymore')
                    }

                    const remainingQuantity = pack.remainingQuantity || 0
                    const absDecimalUnits = Math.abs(unitsAdjust)
                    const operation = unitsAdjust > 0 ? 'add' : 'substract'

                    return Activity.create({
                        pack: packId, date: new Date(), description, operation, quantity: absDecimalUnits, remainingQuantity: operation === 'add'
                            ? remainingQuantity + absDecimalUnits
                            : remainingQuantity - absDecimalUnits,
                    })
                        .catch(error => { throw new SystemError(error.message) })
                        .then((activity) => {
                            if (!activity._id) {
                                throw new SystemError('There was a problem creating the activity log')
                            }

                            return Pack.findByIdAndUpdate(packId, {
                                remainingQuantity: operation === 'add' ? remainingQuantity + absDecimalUnits : remainingQuantity - absDecimalUnits,
                            }, { new: true, runValidators: true }).lean()
                                .catch(error => { throw new SystemError(error.message) })
                                .then((updatedPack) => {
                                    updatedPack.id = updatedPack._id.toString()
                                    delete updatedPack._id

                                    // Check pack after last update in order to know if the status should change
                                    return checkPackAndUpdate(packId).then(() => updatedPack)
                                })
                        })
                })
        })
    /*  .catch((error) => {
         if (error instanceof NotFoundError || error instanceof ValidationError) throw error
         throw new SystemError(error.message)
     }) */
}