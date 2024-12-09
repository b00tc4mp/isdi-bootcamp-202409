import 'dotenv/config'
import db from 'dat'
import createReminder from './createReminder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createReminder('67521389c89514449e0e3adb', 'hola reminders', 'lavidaesbella', '07/07/2000')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())