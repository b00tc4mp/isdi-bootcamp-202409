import 'dotenv/config'
import db from 'dat'
import updateQuantity from './updateQuantity.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateQuantity('675096303607095888a5c0ef', '6750caad227b32a06c78f670', 23)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())