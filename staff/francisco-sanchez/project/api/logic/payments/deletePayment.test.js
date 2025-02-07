import 'dotenv/config'
import db from 'dat'

import deletePayment from './deletePayment.js'

await db.connect(process.env.MONGO_URL)

const userId = '67a1d44e01572f37bc099310'
const paymentId = '67a29b36fc10e1893d4ea8ba'

try {
    const deletedPayment = await deletePayment(userId, paymentId)
    console.log(deletedPayment.message)
} catch (error) {
    console.error('Error deleting payment:', error.message);
} finally {
    await db.disconnect()
}