import 'dotenv/config'
import db from 'dat'

import toggleTimeTracker from './toggleTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const packId = '675cb2fb0e275880c6e8f754'
const customerId = '675b619e599ea5061e869e9c'
const userId = '675855ffb773d7fcc2260e95'

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

