import 'dotenv/config'
import db from 'dat'
import createComment from './createComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createComment('6734c629869a91c1bf87851b', '67360acc4a7c89e68b12861c', 'hola')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())