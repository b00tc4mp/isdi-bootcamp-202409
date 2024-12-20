import 'dotenv/config'
import db from 'dat'
import deleteTask from './deleteTask.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteTask('675ad425dd1adb0c6dda2b96', '67601aafdcbe5dcb58f46d03')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())