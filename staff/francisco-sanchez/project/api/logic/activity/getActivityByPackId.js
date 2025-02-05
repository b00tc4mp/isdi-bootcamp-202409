import { Activity, Pack, User } from 'dat'
import { errors, validate } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, packId) => {
    validate.id(packId, 'packId')
    validate.id(userId, 'userId')

    return (async () => {
        let user, packInfo, activities

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) throw new NotFoundError('user not found')


        try {
            packInfo = await Pack.findById(packId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!packInfo) throw new NotFoundError('pack not found')


        try {
            activities = await Activity.find({ pack: packId }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        //TODO: controlar en el front
        if (activities.length === 0) throw new NotFoundError('There are not activities registered for this pack')


        activities.forEach((activity) => {
            activity.id = activity._id.toString()
            delete activity._id
        })
        return activities

    })()
}