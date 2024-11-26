import 'dotenv/config'
import db from 'dat'
import toggleSavePost from './toggleSavePost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return toggleSavePost('6734bc401af0ac4373132714', '6735ca66682e9e0521f89f5e')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())