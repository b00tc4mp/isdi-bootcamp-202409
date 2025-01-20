import 'dotenv/config'
import db from 'dat'

import registerHistory from './registerHistory.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return registerHistory('674eebdb81e2c619b91f7de5', '675573a210cfb292da0d053f', 'internal_medicine', 'blblblblblblblbbl')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())