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


const userId = '674dd83edb9525488c8f7770'
const recommendId = '674eeafe3ed829aa6c224e52'
const commentId = '674f1af56a2345fe11fa1965'