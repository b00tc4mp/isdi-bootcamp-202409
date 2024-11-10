import db from 'dat'
import removeComment from "./removeComment.js";

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            console.log(removeComment('m2x5opwqqap', 'm2x69ey2d79', 'm2x9zmjci6c'))
        } catch (error) {
            console.error(error)
        }
    })

