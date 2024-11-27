import db from 'dat';
import removeComment from './removeComment.js'

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
    .then(() => {
        try {
            removeComment('673102adab634f097e0719f9', '67311bbc5434cee4d005fd02', '6731209fbc34b4d1cdca4d9b').then(console.log("removed comment"));
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error);
