import { Activity } from 'dat'
import { errors, validate } from 'com'
import { getDecimalToTimeFormat, getFormattedDate } from '../helpers/index.js'

const { SystemError, NotFoundError } = errors

export default async (packId) => {

    try {

        validate.id(packId)

        const activities = await Activity.find({ pack: packId }).lean()

        if (!activities) throw new NotFoundError('There are not activities registered for this pack')

        const formattedActivities = await Promise.all(
            activities.map(async (activity) => ({
                ...activity,
                formattedRemaining: await getDecimalToTimeFormat(activity.remainingQuantity),
                formattedTime: await getDecimalToTimeFormat(activity.quantity),
                formatedDate: await getFormattedDate(activity.date)
            }))
        )

        return formattedActivities

    } catch (error) {
        throw new SystemError(error.message);
    };
}