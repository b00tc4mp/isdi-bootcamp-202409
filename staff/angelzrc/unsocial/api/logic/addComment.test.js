import db from 'dat'
import addComment from "./addComment.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')

    .then(() => {
        try {
            return addComment('673504d23131d3523c5172ec', '673510f3e23955e01fa9a47e', 'nuevo comentario')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)
    .finally(() => db.disconnect())
