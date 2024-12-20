import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await getUserName('67521389c89514449e0e3adb', '67521389c89514449e0e3adb')
    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}