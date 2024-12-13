import 'dotenv/config'
import db from 'dat'
import removeAllFromCart from '../removeAllFromCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return removeAllFromCart('67544252fd819d95f42aa5e5', '675442827dba1b0f041d03d3')
                .then(cart => console.dir(cart, { colors: true, depth: 10 })) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())