import 'dotenv/config'
import db from 'dat'
import addToCart from './addToCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addToCart('674f0f266eb7e1f80ac4a238', '674f0f266eb7e1f80ac4a240', 3)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())