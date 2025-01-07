import 'dotenv/config'
import db from 'dat'
import getPostById from './getPostById.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getPostById('675dbe097190e4da83866bf3', '675dbe097190e4da83866bf8', 'lost')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())