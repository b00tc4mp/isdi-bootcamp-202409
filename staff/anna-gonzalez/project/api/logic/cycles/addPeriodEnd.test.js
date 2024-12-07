import 'dotenv/config'
import db from 'dat'
import addPeriodEnd from './addPeriodEnd.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addPeriodEnd('675479546bb4deb1bead0aea', '2024-11-15T00:00:00.000Z')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())