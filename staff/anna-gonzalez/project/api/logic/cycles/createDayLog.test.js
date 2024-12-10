import 'dotenv/config'
import db from 'dat'
import createDayLog from './createDayLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createDayLog('67581c31a386f5b0f11f126e', '2024-11-02T00:00:00.000Z', { symptoms: 'backache', mood: "happy" })
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())