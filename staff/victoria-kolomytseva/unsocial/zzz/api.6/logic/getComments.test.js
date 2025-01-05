import db from 'dat'
import getComments from './getComments.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            getComments('673102adab634f097e0719f9', '67311bbc5434cee4d005fd02')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())