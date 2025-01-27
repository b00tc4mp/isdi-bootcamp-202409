


import 'dotenv/config'
import db from 'dat'
import deleteExpense from './deleteExpense.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return deleteExpense('6751cdfe33a0a93a0fbb7b24', '676078047faa86568d14870e')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())