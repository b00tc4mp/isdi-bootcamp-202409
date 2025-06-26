import 'dotenv/config'
import db from 'dat'
import getSpotifyStatus from './getSpotifyStatus.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const isConnected = await getSpotifyStatus('68429f2ff01ff02aab70f0d4')

    console.log(isConnected)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}