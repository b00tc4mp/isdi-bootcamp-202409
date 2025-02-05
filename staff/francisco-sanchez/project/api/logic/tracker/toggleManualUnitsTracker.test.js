import 'dotenv/config'
import db from 'dat'

import toggleManualUnitsTracker from './toggleManualUnitsTracker.js'

await db.connect(process.env.MONGO_URL)

const userId = '67a27f2db924ef0e1aca7dd0'
const packId = '67a2837dea9fd833c938e901'
const customerId = '6790f8437cfb3273d03f336c'
const description = 'quito 5 unidades en logic test'

const unitsAdjust = -5

try {
    const pack = await toggleManualUnitsTracker(userId, packId, customerId, description, unitsAdjust)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}