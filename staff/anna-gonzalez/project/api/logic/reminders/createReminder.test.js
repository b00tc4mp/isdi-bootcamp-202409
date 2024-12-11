import 'dotenv/config'
import db from 'dat'
import createReminder from './createReminder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createReminder('67581c31a386f5b0f11f126e', '2024-12-09T00:00:00.000Z', 'Doctor appointment')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())