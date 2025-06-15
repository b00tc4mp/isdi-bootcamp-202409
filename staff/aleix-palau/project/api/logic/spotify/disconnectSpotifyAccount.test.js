import 'dotenv/config'
import db from 'dat'
import disconnectSpotifyAccount from './disconnectSpotifyAccount.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await disconnectSpotifyAccount('68429f2ff01ff02aab70f0d4')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}