import 'dotenv/config'
import db from '../../../dat/index.js' //import db from 'dat' // check routes
import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
    .then(() => {
        try {
            return removeComment(userId, recommendId, commentId)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)
    .finally(() => db.disconnect)


const userId = '6754a8149c175644a60dad82'
const recommendId = '675869507f8697da80d0cd9f'
const commentId = '6758695b7f8697da80d0cda8'