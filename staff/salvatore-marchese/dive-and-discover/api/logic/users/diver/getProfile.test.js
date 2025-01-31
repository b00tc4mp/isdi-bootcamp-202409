import 'dotenv/config'
import db from 'dat'
import getProfile from './getProfile.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const profile = await getProfile('679cf76d0a6821e5457d53fa')

    console.log(profile)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}