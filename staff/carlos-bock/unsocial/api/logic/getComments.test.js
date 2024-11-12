import db from 'dat';
import getComments from './getComments.js';

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getComments('change this text', 'change this too')
                .then(console.log) // expect an array of objects
                .catch(console.error);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());