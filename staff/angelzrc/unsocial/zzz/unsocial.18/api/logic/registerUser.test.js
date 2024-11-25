import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return registerUser('angel', 'angel@angel.com', 'angel', '123123123', '123123123')
                .then(console.log)
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())