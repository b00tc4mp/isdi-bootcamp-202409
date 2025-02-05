import 'dotenv/config'
import db from 'dat'

import AssignPack from './assignPack.js'

await db.connect(process.env.MONGO_URL)

const refPack = '67a1d4c001572f37bc09932c'
const userId = '67a1d44e01572f37bc099310'
const provider = '67a1d44e01572f37bc099310'
const customer = '6780f8fe58255d20563d6a5f'
const payedAmount = '10000'
const paymentMethod = 'cash'
const customerSearch = 'risto'
const description = 'Description test creada desde el back '
const originalQuantity = 10
const remainingQuantity = originalQuantity
const unit = 'hours'
const price = 15000
const currency = 'EUR'
const purchaseDate = new Date()

const addExpiringMonths = 12 //this will be received from original expiring time of reference pack

const expiryDate = new Date(purchaseDate)

expiryDate.setMonth(purchaseDate.getMonth() + addExpiringMonths)

const status = 'Active'


try {
    await AssignPack(userId, customerSearch, refPack, description, payedAmount, paymentMethod)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}