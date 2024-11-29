import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const name = await getUserName('6744af8dc933e7472f436d67', '6744af8dc933e7472f436d67')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}