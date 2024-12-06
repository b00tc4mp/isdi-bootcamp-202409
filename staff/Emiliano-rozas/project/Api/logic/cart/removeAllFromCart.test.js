import 'dotenv/config'
import db from 'dat'
import removeAllFromCart from './removeAllFromCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return removeAllFromCart('6751c9b99f14a50f41da65fd', '6752d9a7a976625c444661d5')
                .then(cart => console.dir(cart, { colors: true, depth: 10 })) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())