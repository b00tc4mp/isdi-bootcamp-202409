import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getUserName('672e20b8106be73d00f7ee7b', '672e2c487f1acbd7a5009c67')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())