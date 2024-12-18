import 'dotenv/config'
import db from 'dat'
import getUserById from './getUserById.js'


db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getUserById('6762dd8e66e99872db6a5b84', '6762dd8e66e99872db6a5b84')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
