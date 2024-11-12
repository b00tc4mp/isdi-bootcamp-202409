import db from 'dat';
import removeComment from './removeComment.js';

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return removeComment('67322777dc618687d7f2a664', '67331595fc390a57647e18a6' ,'67337cc6189e706cc40bae95' )
                .then(console.log) //undefined
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());

    //post not found double check the function parameters