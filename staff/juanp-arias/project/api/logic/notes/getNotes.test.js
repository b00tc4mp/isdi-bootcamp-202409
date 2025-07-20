import 'dotenv/config'
import db from 'dat'
import getNotes from './getNotes.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const notes = await getNotes('67521389c89514449e0e3adb')
    console.log(notes)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}