


import 'dotenv/config'
import db from 'dat'
import addExpense from './addExpense.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        debugger
        try {
            return addExpense('6751cdfe33a0a93a0fbb7b24', 479, 'carne', 'carnia', '2024-12-17T23:22:59.574Z')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())