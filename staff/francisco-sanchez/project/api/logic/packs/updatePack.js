import { Pack, Activity } from "dat";

import { validate, errors } from 'com'

import { getTimeFormatToDecimal } from "../../helpers/index.js";
import checkPackAndUpdate from "./checkPackAndUpdate.js";

const { SystemError, NotFoundError, OwnershipError, ValidationError } = errors

export default (userId, packId, description, remainingQuantity, expiryDate, status) => {
    validate.id(userId, 'userId')
    validate.id(packId, 'packId')
    validate.description(description, 'description')
    validate.date(new Date(expiryDate))
    validate.status(status)

    return Pack.findById(packId)
        .catch(error => { throw new SystemError(error.message) })
        .then(pack => {
            if (!pack) {
                console.error(error.message)
                throw new NotFoundError('Pack not found')
            }

            if (pack.provider.toString() !== userId) {
                throw new OwnershipError('Your user is not the owner of this pack')
            }

            // Si el pack es de horas y `remainingQuantity` no está definido, usamos el valor actual.
            const remainingQuantityPromise = pack.unit === 'hours' && remainingQuantity !== undefined
                ? getTimeFormatToDecimal(remainingQuantity) // Convertir si es válido
                : Promise.resolve(remainingQuantity !== undefined ? remainingQuantity : pack.remainingQuantity); // Usar el valor actual si es undefined

            return remainingQuantityPromise
                .catch(error => { throw new SystemError(error.message) })
                .then((resolvedRemainingQuantity) => {
                    if (pack.unit === 'units') {
                        //TODO: Refactorizable
                        if (remainingQuantity && typeof remainingQuantity !== 'number') {
                            remainingQuantity = parseFloat(remainingQuantity);
                            if (isNaN(remainingQuantity)) {
                                throw new ValidationError('Remaining quantity must be a valid number');
                            }
                        }
                    }

                    const remainingQuantityChanged = resolvedRemainingQuantity !== undefined && resolvedRemainingQuantity !== pack.remainingQuantity

                    return Pack.findByIdAndUpdate(packId, { description, remainingQuantity: resolvedRemainingQuantity, expiryDate, status }, { new: true, runValidators: true })
                        .catch(error => {
                            throw new SystemError(error.message)
                        })
                        .then(updatedPack => {
                            if (remainingQuantityChanged) {
                                const activity = {
                                    pack: packId,
                                    date: new Date(),
                                    description: 'Manual adjustment for remaining quantity',
                                    operation: 'manual adjustment',
                                    quantity: Math.abs(resolvedRemainingQuantity - pack.remainingQuantity),
                                    remainingQuantity: resolvedRemainingQuantity
                                }

                                return Activity.create(activity)
                                    .catch(error => {
                                        throw new SystemError(error.message)
                                    })
                                    .then(() => updatedPack)
                            }
                            return updatedPack
                        })
                })

        })
        .then(updatedPack => {
            // Validación adicional con `checkPackAndUpdate`
            return checkPackAndUpdate(packId)
                .catch(error => {
                    throw new SystemError(error.message);
                })
                .then(() => updatedPack); // Retornar el `updatedPack` original
        });
}