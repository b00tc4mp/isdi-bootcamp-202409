import 'dotenv/config'
import db from 'dat'
import getCyclesStart from './getCyclesStart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCyclesStart('67535d0818fa27fa8d9f3561')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())