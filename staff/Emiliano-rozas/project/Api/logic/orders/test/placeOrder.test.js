import 'dotenv/config'
import db from 'dat'
import placeOrder from '../placeOrder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return placeOrder('675973b7241f04a0fa79c51a')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())