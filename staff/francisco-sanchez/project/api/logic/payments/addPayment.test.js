import 'dotenv/config'
import db from 'dat'

import addPayment from './addPayment.js'

await db.connect(process.env.MONGO_URL)

const packId = '6787814e820328fdd78f6de5'
const amount = 10
const currency = 'EUR'
const method = 'card'
const paymentStatus = 'partially payed'


try {
    const newPayment = await addPayment(packId, amount, currency, method)
    console.log('payment added successfully:', newPayment)
} catch (error) {
    console.error('Error adding payment:', error.message);
} finally {
    await db.disconnect()
}