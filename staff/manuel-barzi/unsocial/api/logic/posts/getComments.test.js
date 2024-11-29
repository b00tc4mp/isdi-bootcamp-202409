import 'dotenv/config'
import db from 'dat'
import getComments from './getComments.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getComments('6734991dbf16fcdc897ef6fc', '6735d250d07b059b5af7c62d')
                .then(console.log) // [{...}, {...}, ...]
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())