import 'dotenv/config'
import db from 'dat'
import petFound from './petFound.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return petFound('676180d86a14c6e1dc619b33', '676180d86a14c6e1dc619b3a')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())