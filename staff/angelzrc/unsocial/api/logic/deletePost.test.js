import db from 'dat'
import deletePost from './deletePost.js';

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            console.log(deletePost("m2xhyzvb5gi", "m2x5opwqqap"))

        } catch (error) {
            console.error(error)
        }
    })
