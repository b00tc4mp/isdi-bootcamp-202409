import { Activity } from 'dat'
import { errors, validate } from 'com'
import { getDecimalToTimeFormat } from '../helpers/index.js'

const { SystemError, NotFoundError } = errors

export default (packId) => {
    validate.id(packId)

    return Activity.find({ pack: packId }).lean()
        .then(activity => {
            if (!activity) throw new NotFoundError('There are not activity registered for this pack')

            //return activity
            return activity.map(activity => ({
                ...activity, formattedRemaining: getDecimalToTimeFormat(activity.remainingQuantity)
            }))
        })
        .catch(error => {
            throw new SystemError(error.message);
        });
}