import 'dotenv/config'
import db from 'dat'
import createCycle from './createCycle.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createCycle('675c46cdf9d5c67853170b22', '2024-12-10T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())