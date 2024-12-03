import 'dotenv/config'
import db from 'dat'

import AssignPack from './assignPack.js'

await db.connect(process.env.MONGO_URL)

const refPack = '674f203c76d076f10c8514b4'
const provider = '674f1fc3a728c03cdd10ba3c'
const customer = '674f1fd72be1bba168fc9d3c'
const description = 'Description test pack 5 hours for services'
const originalQuantity = 5
const remmainingQuantity = originalQuantity
const unit = 'hours'
const price = 235
const currency = 'EUR'
const purchaseDate = new Date()

const addExpiringMonths = 12 //this will be received from original expiring time of reference pack

const expiryDate = new Date(purchaseDate)

expiryDate.setMonth(purchaseDate.getMonth() + addExpiringMonths)

console.log(expiryDate)
const status = 'Active'


try {
    const result = await AssignPack(
        refPack,
        provider,
        customer,
        description,
        originalQuantity,
        remmainingQuantity,
        unit,
        price,
        currency,
        purchaseDate,
        expiryDate,
        status)

    console.log(result)

} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}