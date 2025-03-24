import 'dotenv/config'
import db from 'dat'
import getPlayerUsername from './getPlayerUsername.js'

db.connect(process.env.MONGO_URL_TEST!)
    .then(() => {
        try {
            return getPlayerUsername('674e36639e1a1a8d915e6ded', '674e36639e1a1a8d915e6ded')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())