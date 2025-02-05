import 'dotenv/config'
import db from 'dat'

import getPayments from './getPayments.js'
await db.connect(process.env.MONGO_URL)

const userId = '67a1d44e01572f37bc099310'
const packId = '67a1ff93f0e71ece7b3825ee'

try {
    const result = await getPayments(userId, packId)
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}