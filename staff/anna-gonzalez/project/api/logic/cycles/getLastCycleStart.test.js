import 'dotenv/config'
import db from 'dat'
import getLastCycleStart from './getLastCycleStart.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getLastCycleStart('6751d80fa57db8b9175b39c6')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())