import 'dotenv/config'
import db from 'dat'
import getOrders from './getOrders.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getOrders('6756fd2cf8410aeae543769d')
                .then(orders => console.dir(orders, { colors: true, depth: 10 }))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
