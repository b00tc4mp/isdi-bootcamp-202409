import 'dotenv/config'
import db from 'dat'
import updateUserData from './updateUserData.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await updateUserData('674dfb5b8608b2f4a7c7df9b', 'Juan Pablo', 'juan@pablo.com', '07/07/2000', 'teacher')
    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}