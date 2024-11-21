import 'dotenv/config'
import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return toggleLikePost('672cd989fcf48026d6c1c190', '673227cfd6ac1ab481efb86d')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)
    .finally(() => db.disconnect())