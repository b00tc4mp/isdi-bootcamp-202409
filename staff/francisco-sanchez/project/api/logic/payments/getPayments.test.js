import 'dotenv/config'
import db from 'dat'

import getPayments from './getPayments.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getPayments('6784e37287c4b0f255660371')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}