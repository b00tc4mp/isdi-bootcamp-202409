import 'dotenv/config'
import db from 'dat'

import getCustomers from './getCustomers.js'

await db.connect(process.env.MONGO_URL)
//await db.connect('mongodb://127.0.0.1:27017/hourify')

try {
    const result = await getCustomers('67a1d44e01572f37bc099310')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}
