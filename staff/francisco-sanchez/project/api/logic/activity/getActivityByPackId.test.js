import 'dotenv/config'
import db from 'dat'

import getActivityByPackId from './getActivityByPackId.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getActivityByPackId('676494cc8e76b880d7cca1b0')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}