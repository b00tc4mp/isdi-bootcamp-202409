import 'dotenv/config'
import db from 'dat'

import getActivityByPackId from './getActivityByPackId.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getActivityByPackId('6781141216adde0a2b2f9440')
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}