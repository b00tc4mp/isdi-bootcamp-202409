import 'dotenv/config'
import db from 'dat'
import createCycle from './createCycle.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createCycle('67613ab38ad7845f15ea6873', '2024-11-17T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())