import 'dotenv/config'
import db from 'dat'
import updateQuantity from '../updateQuantity.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateQuantity('6751617073719031799ced74', '67516ca46b28d9fb2cc45bdc', 23)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())