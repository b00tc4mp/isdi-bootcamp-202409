import 'dotenv/config'
import db from 'dat'

import getActivityByPackId from './getActivityByPackId.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getActivityByPackId('6762dc6e22333bfc20ee549b')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}