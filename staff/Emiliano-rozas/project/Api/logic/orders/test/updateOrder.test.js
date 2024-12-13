import 'dotenv/config'
import db from 'dat'
import updateOrder from '../updateOrder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateOrder('675303e4f5d792460d83ba43', 'confirmed')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())