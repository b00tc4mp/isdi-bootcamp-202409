import 'dotenv/config'
import db from 'dat'
import updateCart from '../updateCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateCart('675973b7241f04a0fa79c51a', '675973b8241f04a0fa79c522', 1)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())