import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, code) => {
    validate.id(userId, 'userId')
    validate.code(code)

    return (async () => {
        try {
            // Exchange code for tokens
            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString('base64')
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: process.env.SPOTIFY_REDIRECT_URI
                })
            })

            if (!tokenResponse.ok) {
                const error = await tokenResponse.json()
                throw new SystemError(`Spotify token exchange failed: ${error.error_description || error.error}`)
            }

            const { access_token, refresh_token } = await tokenResponse.json()

            // Get user's Spotify profile
            const profileResponse = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            if (!profileResponse.ok) throw new SystemError('Failed to fetch Spotify profile')

            const spotifyProfile = await profileResponse.json()

            // Update user with Spotify data
            const user = await User.findById(userId)
            if (!user) throw new NotFoundError('user not found')

            user.spotifyId = spotifyProfile.id
            user.spotifyAccessToken = access_token
            user.spotifyRefreshToken = refresh_token

            await user.save()
        } catch (error) {
            if (error instanceof NotFoundError) throw error

            throw new SystemError(error.message)
        }
    })()
}