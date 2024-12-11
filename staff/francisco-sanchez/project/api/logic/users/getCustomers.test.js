import 'dotenv/config'
import db from 'dat'

import getCustomers from './getCustomers.js'

//await db.connect(process.env.MONGO_URL)
await db.connect('mongodb://127.0.0.1:27017/hourify')

const user = '674f1fc3a728c03cdd10ba3c'

try {
    const result = await getCustomers('6751994806347a4b6bd70cdb', '674f1fc3a728c03cdd10ba3c')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}
