import 'dotenv/config'
import db from 'dat'
import toggleLikePosts from './toggleLikePosts.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return toggleLikePosts('672e1cf7fbf40da8a565ff5d', '673219faee3859e42948275f')
                .then(() => console.log('liked'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())