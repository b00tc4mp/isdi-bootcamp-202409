import 'dotenv/config'
import db from 'dat'

import getCustomers from './getCustomers.js'

await db.connect(process.env.MONGO_URL)

const user = '674f1fc3a728c03cdd10ba3c'

try {
    const result = await getCustomers(user)
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}
