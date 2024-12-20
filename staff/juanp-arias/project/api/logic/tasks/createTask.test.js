import 'dotenv/config'
import db from 'dat'
import createTask from './createTask.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createTask('675ad425dd1adb0c6dda2b96', '675c17bcfb94bc5fae489ec2', '12/12/2024', 'read sobre fetch')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())