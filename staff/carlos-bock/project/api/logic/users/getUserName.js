//import { User } from 'dat'
import { User } from '../../../dat/index.js'
//import { validate, errors } from '../../com/index.js'
import validate from '../../../com/validate.js'
import errors from '../../../com/errors.js'

const { SystemError, NotFoundError } = errors

const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async () => {
        let users

        try {
            users = await Promise.all(
                [User.findById(userId).lean(),
                User.findById(targetUserId).lean()]
            )

        } catch (error) {
            throw new SystemError(error.message)
        }

        const [user, targetUser] = users

        if (!user) throw new NotFoundError('user not found')
        if (!targetUser) throw new NotFoundError('target user not found')

        return targetUser.name
    })()

}


export default getUserName