import 'dotenv/config'
import db from 'dat'

import getUserDetails from './getUserDetails.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getUserDetails('6780f8fe58255d20563d6a5f', '6780f8fe58255d20563d6a5f')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}