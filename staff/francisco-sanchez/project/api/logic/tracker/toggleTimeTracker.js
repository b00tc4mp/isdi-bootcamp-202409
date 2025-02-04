import { Activity, BasePack, Pack, User } from 'dat';

import { validate, errors } from 'com';

import { getElapsedTime } from '../../helpers/index.js';

import checkPackAndUpdate from '../packs/checkPackAndUpdate.js';

const { SystemError, NotFoundError, OwnershipError, ValidationError } = errors

export default (userId, packId, customerId, description, operation) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')
    validate.description(description)

    const defaultDescription = 'No description'
    if (description === undefined || description === '') {
        description = defaultDescription
    }

    return Pack.findById(packId)
        .catch(error => { throw new SystemError(error.message) })
        .then(pack => {
            if (!pack) {
                throw new NotFoundError('Pack to track not found')
            }

            const invalidStatuses = ['Finished', 'Pending', 'Expired']
            const currentDate = new Date()
            const expiryDat = new Date(pack.expiryDate)


            if (pack.provider.toString() !== userId) {
                throw new OwnershipError('Your user is not the owner of this pack relationship')
            }

            if (invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has an invalid status to work (Finished, Pending or Expired)')
            }

            if (expiryDat <= currentDate && !invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has expired and cannot be used anymore')
            }


            if (pack.timerActivated != null) {
                const now = new Date
                const activeDate = pack.timerActivated
                const description = pack.descriptionActivityTemp

                const time = (getElapsedTime(activeDate))
                const elapsedMiliseconds = time[1]
                const elapsedHours = (elapsedMiliseconds / 1000 / 60 / 60).toFixed(5)

                const timerActivated = null
                const descriptionActivityTemp = null
                const remainingQuantity = (pack.remainingQuantity - elapsedHours).toFixed(5)

                //Ahora añado un registro a Activity
                return Activity.create({
                    pack: packId,
                    date: now,
                    description: description,
                    operation: operation,
                    quantity: (elapsedHours), //Storage time in miliseconds
                    remainingQuantity: remainingQuantity
                })
                    .catch(error => {
                        if (error instanceof NotFoundError || error instanceof ValidationError) {
                            throw error
                        } else {
                            throw new SystemError(error.message)
                        }
                    })
                    .then(activity => {
                        // Borraremos las variables temporales y actualizamos pack con el nuevo tiempo disponible
                        if (!activity._id) {
                            throw new SystemError('There was a problem create activity')

                        }

                        return Pack.findByIdAndUpdate(packId, { timerActivated, descriptionActivityTemp, remainingQuantity }, { new: true, runValidators: true }).lean()
                            .catch(error => {
                                if (error instanceof NotFoundError || error instanceof ValidationError) {
                                    throw error
                                } else {
                                    throw new SystemError(error.message)
                                }
                            })
                            .then(updatedPack => {
                                updatedPack.id = updatedPack._id.toString()
                                delete updatedPack._id

                                //Check pack after last update in order to know if the status should change
                                return checkPackAndUpdate(packId)
                                    .then(() => updatedPack)

                                //return updatedPack
                            })
                    })
            } else {

                //When timer is not activated we create a register to record start time
                const timerActivated = currentDate
                const descriptionActivityTemp = description
                /*                 console.log('timerActivated --> ' + timerActivated)
                                console.log('descriptionActivityTemp --> ' + descriptionActivityTemp) */
                return Pack.findByIdAndUpdate(packId, { timerActivated, descriptionActivityTemp }, { new: true, runValidators: true }).lean()
                    .catch(error => {
                        if (error instanceof NotFoundError || error instanceof ValidationError) {
                            throw error
                        } else {
                            throw new SystemError(error.message)
                        }
                    })
                    .then(updatedPack => {
                        updatedPack.id = updatedPack._id.toString()
                        delete updatedPack._id

                        return updatedPack
                    })
            }
        })
}