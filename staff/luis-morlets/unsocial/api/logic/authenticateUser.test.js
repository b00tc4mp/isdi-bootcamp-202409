import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            authenticateUser('franciscom', '123123123')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)