import 'dotenv/config'
import db from 'dat'
import getPlayerUsername from './getPlayerUsername.js'

db.connect(process.env.MONGO_URL_TEST!)
    .then(() => {
        try {
            return getPlayerUsername('674dbafcda921f0a7a6ded18', '674dbfe570ea049ec4d8a27f')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())