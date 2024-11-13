import db from 'dat';
import toggleLikePost from './toggleLikePost.js';

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return toggleLikePost('67322777dc618687d7f2a664', '673228e7db7fb63c6a35301e') // change id numbers
                .then(console.log) // undefined
                .catch(console.log)
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());