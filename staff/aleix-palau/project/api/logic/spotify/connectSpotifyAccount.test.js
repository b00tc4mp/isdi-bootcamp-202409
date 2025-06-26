import 'dotenv/config'
import db from 'dat'
import connectSpotifyAccount from './connectSpotifyAccount.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const result = await connectSpotifyAccount('68429f2ff01ff02aab70f0d4', 'mock_auth_code')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}