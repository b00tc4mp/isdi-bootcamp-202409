import 'dotenv/config'
import db from 'dat'

import addPayment from './addPayment.js'

await db.connect(process.env.MONGO_URL)

const packId = '6784e37287c4b0f255660371'
const amount = 10.75
const currency = 'EUR'
const method = 'card'
const paymentStatus = 'partially payed'


try {
    const newPayment = await addPayment(packId, amount, currency, method, paymentStatus)
    console.log('payment added successfully:', newPayment)
} catch (error) {
    console.error('Error adding payment:', error.message);
} finally {
    await db.disconnect()
}