import 'dotenv/config'
import db from 'dat'
import createGroup from './createGroup.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            const students = ["675ad57fdd1adb0c6dda2c20", "675ad593dd1adb0c6dda2c22"]
            return createGroup('675ad425dd1adb0c6dda2b96', 'first group', students)
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())