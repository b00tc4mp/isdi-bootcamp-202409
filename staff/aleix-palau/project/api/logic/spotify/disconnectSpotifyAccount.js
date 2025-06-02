import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            const user = await User.findById(userId)
            if (!user) throw new NotFoundError('user not found')

            // Clear Spotify data
            user.spotifyId = undefined
            user.spotifyAccessToken = undefined
            user.spotifyRefreshToken = undefined

            await user.save()
        } catch (error) {
            if (error instanceof NotFoundError) throw error

            throw new SystemError(error.message)
        }
    })()
}