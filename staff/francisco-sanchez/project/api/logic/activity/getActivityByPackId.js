import { Activity, Pack, User } from 'dat'
import { errors, validate } from 'com'
import { getDecimalToTimeFormat, getFormattedDate } from '../../helpers/index.js'

const { SystemError, NotFoundError } = errors

export default async (userId, packId) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')

    try {
        const user = await User.findById(userId).lean()
        if (!user) throw new NotFoundError('user not found')

        const packInfo = await Pack.findById(packId).lean()
        if (!packInfo) throw new NotFoundError('pack not found')

        const activities = await Activity.find({ pack: packId }).lean()
        if (activities.length === 0) throw new NotFoundError('There are not activities registered for this pack')

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
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}