import 'dotenv/config'
import db from 'dat'

import getUserDetails from './getUserDetails.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getUserDetails('67a1d44e01572f37bc099310', '67a1d44e01572f37bc099310')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}