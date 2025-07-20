import 'dotenv/config'
import db from 'dat'
import addPeriodEnd from './addPeriodEnd.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addPeriodEnd('67613ab38ad7845f15ea6873', '2024-10-22T00:00:00.000Z')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())