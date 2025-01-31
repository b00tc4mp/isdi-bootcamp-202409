import 'dotenv/config'
import db from 'dat'

import getCustomerPacks from './getCustomerPacks.js'
console.log(process.env.MONGO_URL)
await db.connect(process.env.MONGO_URL)


try {
    //const result = await getCustomerPacks('67640e5e2568e5139854dd58') //fotocesc -- hourify-new
    const result = await getCustomerPacks('6780f8fe58255d20563d6a5f') //virtuachezgif -- hourify-new2
    console.log(result)
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}
