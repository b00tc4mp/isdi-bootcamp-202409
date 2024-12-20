import 'dotenv/config'
import db from 'dat'
import getGroups from './getGroups.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getGroups('675ad425dd1adb0c6dda2b96')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())