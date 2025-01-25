import 'dotenv/config'
import db from 'dat'

import AssignPack from './assignPack.js'

await db.connect(process.env.MONGO_URL)

const refPack = '6756c371d3b7b18ceb4f5cf7'
const provider = '675036c010473f3d809e5359'
const customer = '674f1fc3a728c03cdd10ba3c'
const description = 'Description test creada desde el back '
const originalQuantity = 5
const remainingQuantity = originalQuantity
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
    const result = await AssignPack(refPack, provider, customer, description, originalQuantity, remainingQuantity, unit, price, currency, purchaseDate, expiryDate, status)
    console.log(result)

} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}