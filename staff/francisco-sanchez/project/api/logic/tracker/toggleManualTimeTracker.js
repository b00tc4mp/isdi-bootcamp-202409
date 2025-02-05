import { Activity, Pack, User } from 'dat'

import { validate, errors } from 'com'

import { getTimeFormatToDecimal } from '../../helpers/index.js'
import checkPackAndUpdate from '../packs/checkPackAndUpdate.js'

const { SystemError, NotFoundError, OwnershipError, ValidationError } = errors

export default (userId, packId, customerId, description, timeAdjust) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')
    validate.description(description)

    return User.findById(userId)
        .catch((error) => { throw new SystemError(error.message) })
        .then((user) => {
            if (!user) { throw new NotFoundError('user not found') }

            return Pack.findById(packId)
        })

        .then((pack) => {
            if (!pack) {
                throw new NotFoundError('Pack to track not found')
            }

            const invalidStatuses = ['Finished', 'Pending', 'Expired']
            const currentDate = new Date()
            const expiryDate = new Date(pack.expiryDate)
            const defaultDescription = 'No description'

            if (description === undefined || description === '') {
                description = defaultDescription
            }

            if (pack.provider.toString() !== userId) {
                throw new OwnershipError('Your user is not the owner of this pack relationship')
            }

            if (invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has an invalid status to work (Finished, Pending or Expired)')
            }

            if (expiryDate <= currentDate && !invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has expired and cannot be used anymore.')
            }

            const remainingQuantity = pack.remainingQuantity || 0

            return getTimeFormatToDecimal(timeAdjust)
                .then((decimalAdjustTime) => {
                    const absDecimalTime = Math.abs(decimalAdjustTime)
                    const operation = decimalAdjustTime > 0 ? 'add' : 'substract'

                    return Activity.create({
                        pack: packId, date: new Date(), description, operation, quantity: absDecimalTime, remainingQuantity: operation === 'add' ? remainingQuantity + absDecimalTime : remainingQuantity - absDecimalTime,
                    })
                        .catch(error => { throw new SystemError(error.message) })
                        .then((activity) => {
                            if (!activity._id) {
                                throw new SystemError('There was a problem creating activity')
                            }

                            return Pack.findByIdAndUpdate(packId,
                                { remainingQuantity: operation === 'add' ? remainingQuantity + absDecimalTime : remainingQuantity - absDecimalTime },
                                { new: true, runValidators: true }
                            ).lean()
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
    /* .catch((error) => {
        if (error instanceof NotFoundError || error instanceof ValidationError) {
            throw error
        }
        throw new SystemError(error.message)
    }) */
}