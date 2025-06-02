import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            const user = await User.findById(userId).lean()
            if (!user) throw new NotFoundError('user not found')

            return !!(user.spotifyAccessToken && user.spotifyRefreshToken)
        } catch (error) {
            if (error instanceof NotFoundError) throw error

            throw new SystemError(error.message)
        }
    })()
}