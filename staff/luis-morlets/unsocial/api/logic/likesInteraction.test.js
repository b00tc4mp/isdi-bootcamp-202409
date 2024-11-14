import 'dotenv/config'
import db from 'dat'
import likesInteraction from './likesInteraction.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return likesInteraction('672e20b8106be73d00f7ee7b', '67331278d9522b9878546bd3')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())