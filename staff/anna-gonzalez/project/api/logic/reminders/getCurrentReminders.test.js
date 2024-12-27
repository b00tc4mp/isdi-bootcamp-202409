import 'dotenv/config'
import db from 'dat'
import getCurrentReminders from './getCurrentReminders.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getCurrentReminders('675ac723c12fd273993ea8c4', '2024-12-11T00:00:00.000Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())