import 'dotenv/config'
import db from 'dat'

import createPack from './createPack.js'

await db.connect(process.env.MONGO_URL)

const user = '674f1fc3a728c03cdd10ba3c'
const packName = '5h pack '
const description = 'test pack 5'
const quantity = 5
const unit = 'hours'
const expiringTime = 12 //means 12 month
const price = 235
const currency = 'EUR'


try {
    const result = await createPack(user,
        packName,
        description,
        quantity,
        unit,
        expiringTime,
        price,
        currency
    )
    console.log(result)

} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}