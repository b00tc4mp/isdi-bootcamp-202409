import { User } from 'dat'
import { validate, errors } from 'com'
import refreshSpotifyToken from './refreshSpotifyToken.js'

const { SystemError, NotFoundError, AuthorizationError } = errors

export default (userId, query) => {
    validate.id(userId, 'userId')
    validate.query(query)

    return (async () => {
        try {
            const user = await User.findById(userId).lean()
            if (!user) throw new NotFoundError('user not found')

            if (!user.spotifyAccessToken) throw new AuthorizationError('Spotify not connected')

            // Try to search with current token
            let searchResponse = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${user.spotifyAccessToken}`
                    }
                }
            )

            // If unauthorized, refresh token and retry
            if (searchResponse.status === 401) {
                await refreshSpotifyToken(userId)

                // Get updated user with new token
                const updatedUser = await User.findById(userId).lean()

                searchResponse = await fetch(
                    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${updatedUser.spotifyAccessToken}`
                        }
                    }
                )
            }

            if (!searchResponse.ok) throw new SystemError('Failed to search Spotify artists')

            const data = await searchResponse.json()

            // Format artists for frontend
            return data.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images[0]?.url || null,
                popularity: artist.popularity
            }))

        } catch (error) {
            if (error instanceof NotFoundError || error instanceof AuthorizationError) throw error

            throw new SystemError(error.message)
        }
    })()
}