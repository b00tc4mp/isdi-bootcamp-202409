import { User } from 'dat'
import { validate, errors } from 'com'


const { SystemError, NotFoundError } = errors

export default (targetUserId) => {
    validate.id(targetUserId, 'targetUserId')

    return (async () => {
        let users

        try {
            users = await Promise.all([User.findById(targetUserId).lean()])
        } catch (error) {
            throw new SystemError(error.message)
        }

        const [user] = users

        if (!user) throw new NotFoundError('user not found')

        return user
    })()
}