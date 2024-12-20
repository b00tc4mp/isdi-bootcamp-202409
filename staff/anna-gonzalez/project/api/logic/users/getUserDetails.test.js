import 'dotenv/config'
import db from 'dat'
import getUserDetails from './getUserDetails.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const details = await getUserDetails('674c3e11dbe7dcca4bf666e9', '674c3e11dbe7dcca4bf666e9')

    console.log(details)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}