import 'dotenv/config'
import db from 'dat'
import searchSpotifyArtists from './searchSpotifyArtists.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const artists = await searchSpotifyArtists('68429f2ff01ff02aab70f0d4', 'radiohead')

    console.log(artists)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}