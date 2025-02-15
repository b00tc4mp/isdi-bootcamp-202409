import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

await db.connect(process.env.MONGO_URL)

try {
    const user = await authenticateUser('lola@flores.com', '123123123')

    console.log(user)
}catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}