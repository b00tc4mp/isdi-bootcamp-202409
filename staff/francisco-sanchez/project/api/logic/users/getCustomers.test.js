import 'dotenv/config'
import db from 'dat'

import getCustomers from './getCustomers.js'

await db.connect(process.env.MONGO_URL)
//await db.connect('mongodb://127.0.0.1:27017/hourify')

try {
    const result = await getCustomers('6780f8fe58255d20563d6a5f')
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}
