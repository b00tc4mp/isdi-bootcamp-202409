import 'dotenv/config'
import db from 'dat'
import getUserMatches from './getUserMatches.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const matches = await getUserMatches('68429f2ff01ff02aab70f0d4')

    console.log(matches)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}