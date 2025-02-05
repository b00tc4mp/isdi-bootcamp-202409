import 'dotenv/config'
import db from 'dat'

import toggleTimeTracker from './toggleTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const packId = '67a22f86a98255112ba0a883'
const customerId = '6790bfcf1ca7001414157840'
const userId = '67a1d44e01572f37bc099310'

const description = 'Trabajando en la creación de la lógica de api de toggletimmerTracker'
const operation = 'substract'

try {
    const pack = await toggleTimeTracker(userId, packId, customerId, description, operation)
    console.log(pack)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
