import 'dotenv/config'
import db from 'dat'
import getCart from '../getCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCart('675973b7241f04a0fa79c51a')
                .then(cart => console.dir(cart, { colors: true, depth: 10 })) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())