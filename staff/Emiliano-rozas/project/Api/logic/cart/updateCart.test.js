import 'dotenv/config'
import db from 'dat'
import updateCart from './updateCart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateCart('6756fd2df8410aeae543769f', '6756fd2df8410aeae54376ad', 1)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())