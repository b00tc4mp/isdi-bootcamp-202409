


import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return (async () => {
        let users
        try {
            users = await Promise.all([User.findById(userId).lean(), User.findById(targetUserId).lean()])
        } catch (error) {
            throw new SystemError(error.message)
        }

        const [user, targetUser] = users

        if (!user) throw new NotFoundError('Usuario no encontrado')
        if (!targetUser) throw new NotFoundError('Target de usuario no encontrado')

        return targetUser
    })()
}