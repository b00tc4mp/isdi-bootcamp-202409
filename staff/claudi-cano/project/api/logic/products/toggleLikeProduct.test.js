import 'dotenv/config'
import db from 'dat'
import toggleLikeProduct from './toggleLikeProduct.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return toggleLikeProduct('', '') // datos del mongoose
                .then(console.log) // undefinded
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconect())