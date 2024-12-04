import 'dotenv/config'
import db from 'dat'
import getPeriodDays from './getPeriodDays.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPeriodDays('67508ae99b5b6f6a7961aaf5', new Date('2024-10-11T00:00:00.000'))
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())