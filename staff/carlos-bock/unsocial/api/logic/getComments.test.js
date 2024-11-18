import db from 'dat';
import getComments from './getComments.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getComments('67322777dc618687d7f2a664', '67331595fc390a57647e18a6')
                .then(console.log) // expect an array of objects
                .catch(console.error);
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect());