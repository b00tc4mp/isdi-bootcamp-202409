import 'dotenv/config'
import db from 'dat'
import deleteProduct from './deleteProduct.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteProduct('', '') // datos de mongoose
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())