import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId, data) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')
    validate.profileData(data)

    return (async () => {
        let user, targetUser

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        
        if (!user) { throw new NotFoundError('user not found') }

        try {
            targetUser = await User.findById(targetUserId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!targetUser) { throw new NotFoundError('target user not found') }

        const dataToBeUpdated = {
            ...targetUser,
            ...data
        }
        
        // Return the updated user directly
        try {
             await User.findByIdAndUpdate(targetUser, dataToBeUpdated, { new: true }).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}