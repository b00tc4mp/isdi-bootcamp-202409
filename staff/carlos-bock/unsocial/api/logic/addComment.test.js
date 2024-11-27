import db from 'dat';
import addComment from './addComment.js';

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return addComment('67322777dc618687d7f2a664', '67331595fc390a57647e18a6', 'Niiiiiice pooooost!')
            .then(console.log)
            .catch(console.error)
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());


