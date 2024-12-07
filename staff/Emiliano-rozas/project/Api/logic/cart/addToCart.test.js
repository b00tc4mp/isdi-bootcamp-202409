import 'dotenv/config'
import db from 'dat'
import addToCart from './addToCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addToCart('67544252fd819d95f42aa5e5', '67544253fd819d95f42aa5f0', 1)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())