import 'dotenv/config'
import db from 'dat'
import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await registerUser('Juan Pablo', 'juan@pablo.com', '07/01/2000', '123456', '123456')
    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}