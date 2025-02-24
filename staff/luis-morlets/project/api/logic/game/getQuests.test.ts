import 'dotenv/config'
import db from 'dat'
import getQuests from './getQuests.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const quests = await getQuests('674f80e721465aa4822f5b02')

    console.log(quests)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}