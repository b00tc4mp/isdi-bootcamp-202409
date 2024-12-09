import 'dotenv/config'
import db from 'dat'
import placeOrder from './placeOrder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return placeOrder('6756fd2df8410aeae543769f')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())