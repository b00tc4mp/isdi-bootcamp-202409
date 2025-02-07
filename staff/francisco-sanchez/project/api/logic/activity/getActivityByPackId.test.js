import 'dotenv/config'
import db from 'dat'

import getActivityByPackId from './getActivityByPackId.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getActivityByPackId('6780f8fe58255d20563d6a5f', '6784efdd87c4b0f255660407')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}