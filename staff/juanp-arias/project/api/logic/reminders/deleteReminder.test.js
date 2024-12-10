import 'dotenv/config'
import db from 'dat'
import deleteReminder from './deleteReminder.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteReminder('675857763423c819f56b5047', '67585b6e3423c819f56b5129')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())