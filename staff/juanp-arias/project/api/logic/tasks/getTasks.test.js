import 'dotenv/config'
import db from 'dat'
import getTasks from './getTasks.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const tasks = await getTasks('675ad57fdd1adb0c6dda2c20')
    console.log(tasks)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}