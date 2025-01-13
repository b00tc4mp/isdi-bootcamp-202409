import 'dotenv/config'
import db from 'dat'

import deletePayment from './deletePayment.js'

await db.connect(process.env.MONGO_URL)

const paymentId = '67850f19c3b1d77acc59201b'

try {
    const deletedPayment = await deletePayment(paymentId)
    console.log(deletedPayment.message)
} catch (error) {
    console.error('Error deleting payment:', error.message);
} finally {
    await db.disconnect()
}