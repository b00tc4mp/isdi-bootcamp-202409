import 'dotenv/config'
import db from 'dat'
import createCycle from './createCycle.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createCycle('674dda26d3ff217cab15e9c6', '2024-11-02')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())