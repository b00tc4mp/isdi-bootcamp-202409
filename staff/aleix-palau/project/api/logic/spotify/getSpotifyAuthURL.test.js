import 'dotenv/config'
import getSpotifyAuthURL from './getSpotifyAuthURL.js'

try {
    const authUrl = getSpotifyAuthURL()

    console.log(authUrl)
} catch (error) {
    console.error(error)
}