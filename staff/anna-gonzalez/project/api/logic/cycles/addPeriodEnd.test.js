import 'dotenv/config'
import db from 'dat'
import addPeriodEnd from './addPeriodEnd.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addPeriodEnd('674dda26d3ff217cab15e9c6', '674ddd33d565b897eea98e15', new Date())
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())