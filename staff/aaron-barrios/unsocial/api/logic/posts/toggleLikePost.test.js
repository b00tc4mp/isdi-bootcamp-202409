import 'dotenv/config'
import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return toggleLikePost('6734c629869a91c1bf87851b', '6734c629869a91c1bf87851d')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())