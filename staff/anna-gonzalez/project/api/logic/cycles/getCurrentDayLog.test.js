import 'dotenv/config'
import db from 'dat'
import getCurrentDayLog from './getCurrentDayLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCurrentDayLog('67613ab38ad7845f15ea6873', '2024-12-16')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())