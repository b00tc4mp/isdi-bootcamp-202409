import 'dotenv/config'
import db from 'dat'
import getDayLogs from './getDayLogs.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getDayLogs('6755a7143644e39f2cd8e326')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())