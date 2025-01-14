import { Activity, Pack } from 'dat'
import { errors, validate } from 'com'
import { getDecimalToTimeFormat, getFormattedDate } from '../helpers/index.js'

const { SystemError, NotFoundError } = errors

export default async (packId) => {

    try {
        validate.id(packId)

        const packInfo = await Pack.findById(packId).lean()
        if (!packInfo) throw new NotFoundError('Pack not found error')

        const activities = await Activity.find({ pack: packId }).lean()
        if (!activities) throw new NotFoundError('There are not activities registered for this pack')

        const formattedActivities = await Promise.all(
            activities.map(async (activity) => {
                let formattedRemaining
                let formattedOperation

                if (packInfo.unit === 'hours') {
                    formattedRemaining = await getDecimalToTimeFormat(activity.remainingQuantity)
                    formattedRemaining += ' h'
                    formattedOperation = await getDecimalToTimeFormat(activity.quantity)
                    formattedOperation += ' h'
                } else if (packInfo.unit === 'units') {
                    formattedRemaining = `${activity.remainingQuantity} un`
                    formattedOperation = `${activity.quantity} un`
                }

                activity.id = activity._id
                delete activity._id

                return {
                    ...activity,
                    formattedRemaining,
                    formattedOperation,
                    formatedDate: await getFormattedDate(activity.date)
                }
            })
        )

        return formattedActivities

    } catch (error) {
        throw new SystemError(error.message)
    }
}