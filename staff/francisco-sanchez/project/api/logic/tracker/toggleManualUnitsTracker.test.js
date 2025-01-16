import 'dotenv/config'
import db from 'dat'

import toggleManualUnitsTracker from './toggleManualUnitsTracker.js'

await db.connect(process.env.MONGO_URL)

const userId = '6780f8fe58255d20563d6a5f' //risto
const packId = '6780fa7958255d20563d6a97'
const customerId = '6780f91758255d20563d6a61' //cirera
const description = 'Ahora añado 2 horas al pack '

const unitsAdjust = -17

try {
    const pack = await toggleManualUnitsTracker(userId, packId, customerId, description, unitsAdjust)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}