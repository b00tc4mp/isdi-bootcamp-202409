import 'dotenv/config'
import db from 'dat'
import createReminder from './createReminder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createReminder('6758522e3423c819f56b4fa4', 'hola reminders', 'probando borrado', '12/12/2024')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())