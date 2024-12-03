import 'dotenv/config'
import db from 'dat'
import getCart from './getCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCart('674f0f266eb7e1f80ac4a238')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())