import 'dotenv/config'
import db from 'dat'
import deleteRecommend from './deleteRecommend.js'

const userId = '674dd83edb9525488c8f7770'
const recommendId = '674defa12e369641415eca1d'

db.connect(process.env.MONGO_URL_TEST)//
    .then(() => {
        try {
            return deleteRecommend(userId, recommendId)
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())