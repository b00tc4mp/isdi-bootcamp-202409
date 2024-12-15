import 'dotenv/config'
import db from 'dat'
import getReminders from './getReminders.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const reminder = await getReminders('675ad425dd1adb0c6dda2b96')
    console.log(reminder)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}