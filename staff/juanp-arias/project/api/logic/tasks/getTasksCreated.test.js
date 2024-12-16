import 'dotenv/config'
import db from 'dat'
import getTasksCreated from './getTasksCreated.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const tasks = await getTasksCreated('675ad425dd1adb0c6dda2b96')
    console.log(tasks)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}