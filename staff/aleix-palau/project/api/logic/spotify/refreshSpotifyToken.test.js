import 'dotenv/config'
import db from 'dat'
import refreshSpotifyToken from './refreshSpotifyToken.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const newToken = await refreshSpotifyToken('68429f2ff01ff02aab70f0d4')

    console.log(newToken)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}