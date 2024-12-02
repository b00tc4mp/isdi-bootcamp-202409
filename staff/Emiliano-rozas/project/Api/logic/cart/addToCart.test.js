import 'dotenv/config'
import db from 'dat'
import addToCart from './addToCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addToCart('674dddf40af31ab04c7a6142', '674dddf40af31ab04c7a614a', 3)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())