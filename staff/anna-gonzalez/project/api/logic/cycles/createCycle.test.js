import 'dotenv/config'
import db from 'dat'
import createCycle from './createCycle.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createCycle('6751d80fa57db8b9175b39c6', '2024-11-02T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())