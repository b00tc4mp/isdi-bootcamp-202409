import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return deletePost('673b4da93081fe600216ebc7', '673daf83e295d8ea2a1bd75f')
                .then(() => console.log('post deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())