import 'dotenv/config'
import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addComment('', '', 'wow!') // añadir datos de mongoose
                .then(console.log) // undefinded
                .catch(console.error)
        } catch (error) {
            console.error
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())