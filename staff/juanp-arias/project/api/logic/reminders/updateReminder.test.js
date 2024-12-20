import 'dotenv/config'
import db from 'dat'
import updateReminder from './updateReminder.js'

await db.connect(process.env.MONGO_URL_TEST)
try {
    const reminder = await updateReminder('675857763423c819f56b5047', '67596d5ebb8f29a871cbcc13', 'Hola prueba', 'Hola Prueba', '12-10-2024')
    console.log(reminder)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}