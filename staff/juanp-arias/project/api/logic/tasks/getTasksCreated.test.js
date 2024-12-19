import 'dotenv/config'
import db from 'dat'
import getTasksCreated from './getTasksCreated.js'

await db.connect(process.env.MONGO_URL)

try {
    const tasks = await getTasksCreated('6762eb44f654002a1de0522f')
    console.log(tasks)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}