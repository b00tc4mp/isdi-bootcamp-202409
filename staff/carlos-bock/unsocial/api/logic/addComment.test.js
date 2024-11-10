import db from 'dat';
import addComment from './addComment.js';


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            addComment('6730b27ff18538626b529fa1', 'm3bmdlxe0sh', 'Niiiiiice pooooost!');
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error);


