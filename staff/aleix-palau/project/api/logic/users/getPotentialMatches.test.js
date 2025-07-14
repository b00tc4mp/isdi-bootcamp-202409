import 'dotenv/config'
import db from 'dat'
import getPotentialMatches from './getPotentialMatches.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const matches = await getPotentialMatches('68429f2ff01ff02aab70f0d4')

    console.log(matches)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}