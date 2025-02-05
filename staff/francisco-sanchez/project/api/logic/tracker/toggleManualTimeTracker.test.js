import 'dotenv/config'
import db from 'dat'

import toggleManualTimeTracker from './toggleManualTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const userId = '67a1d44e01572f37bc099310'
const packId = '67a1ff93f0e71ece7b3825ee'
const customerId = '6790f8437cfb3273d03f336c' //javi
const description = 'Añado horas manualmente'

const timeAdjust = '10:20:00'

try {
    const pack = await toggleManualTimeTracker(userId, packId, customerId, description, timeAdjust)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}

