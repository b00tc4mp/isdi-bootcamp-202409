import 'dotenv/config'
import db from '../../../dat/index.js' //import db from 'dat' // check routes
import upVote from './upVote.js'

db.connect('mongodb://127.0.0.1:27017/mired')//process.env.MONGO_URL
    .then(() => {
        try {
            return upVote(userId, recommendId)
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

const userId = '674dd83edb9525488c8f7770'
const recommendId = '674eeafe3ed829aa6c224e52'