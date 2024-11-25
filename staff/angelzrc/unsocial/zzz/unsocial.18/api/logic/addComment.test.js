import 'dotenv/config'
import db from 'dat'
import addComment from "./addComment.js";

db.connect(process.env.MONGO_URL)

    .then(() => {
        try {
            return addComment('672cd989fcf48026d6c1c190', '673227cfd6ac1ab481efb86d', 'nuevo comentario')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)
    .finally(() => db.disconnect())
