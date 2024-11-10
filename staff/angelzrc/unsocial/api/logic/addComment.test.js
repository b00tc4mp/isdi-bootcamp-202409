import db from 'dat'
import addComment from "./addComment.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')

    .then(() => {
        try {
            console.log(addComment('m2x5opwqqap', 'm2x69ey2d79', 'nuevo comentario'))
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)
