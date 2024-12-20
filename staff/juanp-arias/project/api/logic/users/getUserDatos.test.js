import 'dotenv/config'
import db from 'dat'
import getUserDatos from './getUserDatos.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await getUserDatos('674dfb5b8608b2f4a7c7df9b', '674dfb5b8608b2f4a7c7df9b')
    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}