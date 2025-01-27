


import 'dotenv/config'
import db from 'dat'
import getExpenses from './getExpenses.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return getExpenses('6751cdfe33a0a93a0fbb7b24')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())