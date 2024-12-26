import 'dotenv/config'
import db from 'dat'

import getUserDetails from './getUserDetails.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getUserDetails('676494a48e76b880d7cca1a2', '676494a48e76b880d7cca1a2')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}