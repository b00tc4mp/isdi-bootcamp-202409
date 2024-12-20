import 'dotenv/config'
import db from 'dat'
import deleteGroup from './deleteGroup.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deleteGroup('675ad425dd1adb0c6dda2b96', '675b40b95299209bd61ec5b7')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())