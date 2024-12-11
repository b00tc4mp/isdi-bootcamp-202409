import 'dotenv/config'
import db from 'dat'
import getCurrentDayLog from './getCurrentDayLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCurrentDayLog('67581c31a386f5b0f11f126e', '2024-11-02')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())