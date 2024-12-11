import 'dotenv/config'
import db from 'dat'
import getProfile from './getProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const profile = await getProfile('67503f6a10182798c1418773')

    console.log(profile)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}