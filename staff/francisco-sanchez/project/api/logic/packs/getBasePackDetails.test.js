import 'dotenv/config'
import db from 'dat'

import getBasePackDetails from './getBasePackDetails.js'

await db.connect(process.env.MONGO_URL)

const userId = '6780f8fe58255d20563d6a5f'
const basePackId = '67877fc0820328fdd78f6d21'

try {
    const result = await getBasePackDetails(userId, basePackId)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}