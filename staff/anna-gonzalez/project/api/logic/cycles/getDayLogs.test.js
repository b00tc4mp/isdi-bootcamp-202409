import 'dotenv/config'
import db from 'dat'
import getDayLogs from './getDayLogs.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getDayLogs('67581c31a386f5b0f11f126e')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())