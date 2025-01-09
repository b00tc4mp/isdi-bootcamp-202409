import 'dotenv/config'
import db from 'dat'

import getCustomerPacks from './getCustomerPacks.js'
console.log(process.env.MONGO_URL)
await db.connect(process.env.MONGO_URL)


try {
    const result = await getCustomerPacks('67640e5e2568e5139854dd58') //fotocesc
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}
