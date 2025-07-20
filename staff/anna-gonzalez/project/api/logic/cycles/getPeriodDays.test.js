import 'dotenv/config'
import db from 'dat'
import getPeriodDays from './getPeriodDays.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPeriodDays('67613ab38ad7845f15ea6873')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())