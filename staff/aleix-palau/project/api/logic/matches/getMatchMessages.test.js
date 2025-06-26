import 'dotenv/config'
import db from 'dat'
import getMatchMessages from './getMatchMessages.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const messages = await getMatchMessages('68429f2ff01ff02aab70f0d4', '684af1e1fc132b28760a1cd0')

    console.log(messages)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}