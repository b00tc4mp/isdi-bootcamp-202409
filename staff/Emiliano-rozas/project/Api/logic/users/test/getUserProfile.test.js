import 'dotenv/config'
import db from 'dat'
import getUserProfile from '../getUserProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserProfile('675c13f7b61a0542d1ae04e9', '675c13f7b61a0542d1ae04e9')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}