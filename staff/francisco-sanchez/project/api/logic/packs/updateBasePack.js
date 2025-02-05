import { BasePack, User } from "dat";

import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, basePackId, packName, description, quantity, unit, expiringTime, price, currency) => {
    validate.id(basePackId, 'basePackId')
    validate.id(userId, 'userId')
    validate.packName(packName)
    validate.description(description)
    validate.text(unit, 'unit')
    validate.currency(currency)
    validate.expiring(expiringTime)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return BasePack.findById(basePackId)
                .catch(error => { throw new SystemError(error.message) })
                .then(basepack => {
                    if (!basepack) {
                        throw new NotFoundError('Pack not found')
                    }

                    if (basepack.user.toString() !== userId) {
                        throw new OwnershipError('Your user is not the owner of this pack')
                    }

                    return BasePack.findByIdAndUpdate(basePackId, { packName, description, quantity, unit, expiringTime, price, currency }, { new: true, runValidators: true })
                        .catch(error => {
                            throw new SystemError(error.message)
                        })
                        .then(() => { })
                })
        })
}

