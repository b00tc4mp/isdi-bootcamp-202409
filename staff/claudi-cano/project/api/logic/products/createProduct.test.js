import 'dotenv/config'
import db from 'dat'
import createProduct from './createProduct.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createProduct('', '', '') // datos del mongoose
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())