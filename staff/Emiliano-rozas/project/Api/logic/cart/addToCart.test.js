import 'dotenv/config'
import db from 'dat'
import addToCart from './addToCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addToCart('6753030ba68cd6e4d4ecd389', '6753030ca68cd6e4d4ecd399', 1)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())