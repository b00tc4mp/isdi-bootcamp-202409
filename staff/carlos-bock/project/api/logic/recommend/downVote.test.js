import 'dotenv/config'
import db from 'dat'
import downVote from './downVote.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return downVote(userId, recommendId)
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