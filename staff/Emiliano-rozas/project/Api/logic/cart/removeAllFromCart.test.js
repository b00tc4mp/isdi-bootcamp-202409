import 'dotenv/config'
import db from 'dat'
import removeAllFromCart from './removeAllFromCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return removeAllFromCart('675096303607095888a5c0ef', '6750c9c33be159184315b897')
                .then(cart => console.dir(cart, { colors: true, depth: 10 })) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())