import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            removeComment('673102adab634f097e0719f9', '67311bbc5434cee4d005fd02', '6731209fbc34b4d1cdca4d9b')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
