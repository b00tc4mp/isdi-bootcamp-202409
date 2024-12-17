import 'dotenv/config'
import db from 'dat'
import getTasksCount from './getTasksCount.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getTasksCount('675ad57fdd1adb0c6dda2c20')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())