import 'dotenv/config'
import db from 'dat'

import addPayment from './addPayment.js'

await db.connect(process.env.MONGO_URL)

const userId = '67a1d44e01572f37bc099310'
const packId = '67a1ff93f0e71ece7b3825ee'
const amount = 140.97
const currency = 'EUR'
const method = 'cash'
const paymentStatus = 'partially payed'


try {
    const newPayment = await addPayment(userId, packId, amount, currency, method)
    console.log('payment added successfully')
} catch (error) {
    console.error('Error adding payment:', error.message);
} finally {
    await db.disconnect()
}