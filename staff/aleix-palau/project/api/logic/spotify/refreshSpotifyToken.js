import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, AuthorizationError } = errors

export default userId => {
    validate.id(userId, 'userId')

    return (async () => {
        try {
            const user = await User.findById(userId)
            if (!user) throw new NotFoundError('user not found')

            if (!user.spotifyRefreshToken) throw new AuthorizationError('No refresh token available')

            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString('base64')
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: user.spotifyRefreshToken
                })
            })

            if (!tokenResponse.ok) {
                const error = await tokenResponse.json()
                throw new SystemError(`Spotify token refresh failed: ${error.error_description || error.error}`)
            }

            const { access_token } = await tokenResponse.json()

            // Update access token
            user.spotifyAccessToken = access_token
            await user.save()

            return access_token
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError) throw error

            throw new SystemError(error.message)
        }
    })()
}