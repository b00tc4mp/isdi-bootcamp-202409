import 'dotenv/config'
import db from 'dat'
import addToCart from './addToCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addToCart('675096303607095888a5c0ef', '675096303607095888a5c0f9', 5)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())