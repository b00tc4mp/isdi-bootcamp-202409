import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return deletePost('6734c629869a91c1bf87851b', '6735b587145ecab2cdd99a61')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())