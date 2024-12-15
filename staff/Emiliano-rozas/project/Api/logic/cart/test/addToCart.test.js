import 'dotenv/config'
import db from 'dat'
import addToCart from '../addToCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addToCart('6756fd2df8410aeae543769e', '6756fd2df8410aeae54376b2', 2)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())