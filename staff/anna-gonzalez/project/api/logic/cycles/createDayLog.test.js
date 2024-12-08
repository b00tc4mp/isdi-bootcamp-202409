import 'dotenv/config'
import db from 'dat'
import createDayLog from './createDayLog.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createDayLog('6755a7143644e39f2cd8e326', '2024-11-02T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())