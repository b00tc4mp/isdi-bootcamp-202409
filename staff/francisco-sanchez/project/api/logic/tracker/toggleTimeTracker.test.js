import 'dotenv/config'
import db from 'dat'

import toggleTimeTracker from './toggleTimeTracker.js'

await db.connect(process.env.MONGO_URL)

const packId = '6781141216adde0a2b2f9440' //pack for testing ISDI 10h
const customerId = '6780f91758255d20563d6a61' //cirera
const userId = '6780f8fe58255d20563d6a5f' //risto

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

