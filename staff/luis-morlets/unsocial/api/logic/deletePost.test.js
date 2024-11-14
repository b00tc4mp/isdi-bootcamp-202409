import 'dotenv/config'
import db from 'dat'

import deletePost from './deletePost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deletePost('672e2c487f1acbd7a5009c67', '67321930d260445bfba74342')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())