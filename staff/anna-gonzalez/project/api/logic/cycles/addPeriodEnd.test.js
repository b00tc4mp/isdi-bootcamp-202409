import 'dotenv/config'
import db from 'dat'
import addPeriodEnd from './addPeriodEnd.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addPeriodEnd('6751ba9454e1acba0b6fa942', '2024-10-15T00:00:00.000Z')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())