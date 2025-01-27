


import 'dotenv/config'
import db from 'dat'
import getUserId from './getUserId.js'

await db.connect(process.env.MONGO_URL)

try {
    const user = await getUserId('')
    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}