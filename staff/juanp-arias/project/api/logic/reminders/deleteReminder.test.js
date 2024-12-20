import 'dotenv/config'
import db from 'dat'
import deleteReminder from './deleteReminder.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return deleteReminder('6762e06f8d3707390600a686', '6762e4a68d3707390600a6c9')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())