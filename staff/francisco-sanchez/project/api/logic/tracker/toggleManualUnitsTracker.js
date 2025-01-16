import { Activity, Pack } from 'dat';

import { validate, errors } from 'com';

const { SystemError, NotFoundError, OwnershipError, ValidationError, DataIntegrityError } = errors

export default (userId, packId, customerId, description, unitsAdjust) => {
    validate.id(packId, 'packId');
    validate.id(userId, 'userId');
    validate.id(customerId, 'customerId');
    validate.integerNum(unitsAdjust)

    return Pack.findById(packId)
        .then((pack) => {
            if (!pack) {
                throw new NotFoundError('Pack to track not found');
            }

            const invalidStatuses = ['Finished', 'Pending', 'Expired'];
            const currentDate = new Date();
            const expiryDate = new Date(pack.expiryDate);

            if (pack.provider.toString() !== userId) {
                throw new OwnershipError('Your user is not the owner of this pack relationship');
            }

            if (invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has an invalid status to work (Finished, Pending or Expired)');
            }

            if (expiryDate <= currentDate && !invalidStatuses.includes(pack.status)) {
                throw new ValidationError('This pack has expired and cannot be accessed.');
            }

            const remainingQuantity = pack.remainingQuantity || 0;

            const absDecimalUnits = Math.abs(unitsAdjust)
            const operation = unitsAdjust > 0 ? 'add' : 'substract';

            return Activity.create({
                pack: packId,
                date: new Date(),
                description,
                operation,
                quantity: absDecimalUnits,
                remainingQuantity: operation === 'add' ? remainingQuantity + absDecimalUnits : remainingQuantity - absDecimalUnits
                //remainingQuantity: remainingQuantity - absDecimalUnits,
            }).then((activity) => {
                if (!activity._id) {
                    throw new SystemError('There was a problem creating the activity log');
                }

                return Pack.findByIdAndUpdate(
                    packId, { remainingQuantity: operation === 'add' ? remainingQuantity + absDecimalUnits : remainingQuantity - absDecimalUnits }, { new: true, runValidators: true }).lean()
                    .then((updatedPack) => {
                        updatedPack.id = updatedPack._id.toString();
                        delete updatedPack._id;

                        return updatedPack;
                    });
            });

        })
        .catch((error) => {
            throw new SystemError(error.message);
        });
};