import db from 'dat';

import getUserName from './getUserName.js';

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getUserName('672e08451dfe72076c0ca52c', '672e085966498923e86dcd2b')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())