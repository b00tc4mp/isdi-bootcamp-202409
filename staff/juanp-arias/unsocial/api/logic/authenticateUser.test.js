import db from 'dat'
import 'dotenv/config'
import authenticateUser from './authenticateUser.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return authenticateUser('juanpablo', '123456')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())