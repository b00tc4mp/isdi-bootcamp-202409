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

const userId = '6751bc52ceeccee4933330a5'
const recommendId = '67533984796a6987a202a71c'