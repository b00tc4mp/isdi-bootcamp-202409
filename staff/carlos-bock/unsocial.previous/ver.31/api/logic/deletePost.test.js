import db from 'dat';
import deletePost from './deletePost.js';

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return deletePost('67322777dc618687d7f2a664', '6732297cf14bbb73fc188419') //parameters need to be updated
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error);
        }

    })
    .catch(console.error)
    .finally(() => db.disconnect());
