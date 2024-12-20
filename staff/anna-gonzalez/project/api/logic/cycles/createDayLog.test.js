import 'dotenv/config'
import db from 'dat'
import createDayLog from './createDayLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createDayLog('67613ab38ad7845f15ea6873', '2024-12-17T00:00:00.000Z', { symptoms: ['backache', 'headache'], mood: 'sad' })
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())