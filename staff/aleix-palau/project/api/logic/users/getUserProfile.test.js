import 'dotenv/config'
import db from 'dat'
import getUserProfile from './getUserProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const profile = await getUserProfile('675ee3f290969a37a31f0744')

    console.log(profile)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}