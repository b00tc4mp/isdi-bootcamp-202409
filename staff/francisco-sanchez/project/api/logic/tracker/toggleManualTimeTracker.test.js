import 'dotenv/config'
import db from 'dat'

import toggleManualTimeTracker from './toggleManualTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const userId = '6780f8fe58255d20563d6a5f' //risto
const packId = '67877ffb820328fdd78f6d32' //pack de javi
const customerId = '67877f2f820328fdd78f6cfe' //javi
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

