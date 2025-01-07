import 'dotenv/config'
import db from 'dat'
import getRemindersByDate from './getRemindersByDate.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const reminders = await getRemindersByDate('67521389c89514449e0e3adb', '2024-12-12')
    console.log(reminders)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}