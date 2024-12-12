import 'dotenv/config'
import db from 'dat'
import getReminder from './getReminder.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const reminder = await getReminder('675857763423c819f56b5047', '67596d4cbb8f29a871cbcc08')
    console.log(reminder)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}