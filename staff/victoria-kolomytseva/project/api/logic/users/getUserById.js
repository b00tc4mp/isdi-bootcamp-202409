import { User } from 'dat'
import { validate, errors } from 'com'


const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(targetUserId, 'targetUserId')
    validate.id(userId, 'userId')

    return (async () => {
        let users

        try {
            users = await Promise.all([User.findById(userId).select('-__v').lean(), User.findById(targetUserId).select('-__v').lean()])
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!users[0]) throw new NotFoundError('user not found')
        if (!users[1]) throw new NotFoundError('user not found')

        let targetUser = users[1]

        targetUser = {
            ...targetUser,
            id: targetUser._id.toString()
        }

        delete targetUser._id

        return targetUser
    })()
}