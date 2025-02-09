import 'dotenv/config'
import db from 'dat'
import getUserProfile from './getUserProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const profile = await getUserProfile('6773b839913c7b2bc70a581f')

    console.log(profile)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}