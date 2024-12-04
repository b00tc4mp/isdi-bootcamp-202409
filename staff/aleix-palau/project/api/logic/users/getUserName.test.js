import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('674dc7dc5d7c56152be72b18', '674dc7dc5d7c56152be72b18')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}