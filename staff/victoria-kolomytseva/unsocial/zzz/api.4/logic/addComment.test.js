import db from 'dat';
import addComment from './addComment.js'

db.connect("mongodb://127.0.0.1:27017/unsocial-test").then(() => {
    try {
        addComment('673102adab634f097e0719f9', '67311bbc5434cee4d005fd02', 'hola mundo')

            .then(console.log("comment add"))
            .catch((error) => console.error(error.message));
    } catch (error) {
        console.error(error)
    }
});