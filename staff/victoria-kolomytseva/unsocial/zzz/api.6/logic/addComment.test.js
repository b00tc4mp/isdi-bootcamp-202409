import db from 'dat';
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return addComment('673102adab634f097e0719f9', '67311bbc5434cee4d005fd02', 'hola mundo')
                .then(console.log("comment add"))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())