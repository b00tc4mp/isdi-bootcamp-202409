import db from 'dat';
import getComments from './getComments.js';

db.connect("mongodb://127.0.0.1:27017/unsocial-test").then(() => {
    try {
        getComments('673102adab634f097e0719f9', '67311bbc5434cee4d005fd02')
            .then(console.log)
            .catch((error) => console.error(error.message));
    } catch (error) {
        console.error(error)
    }
});