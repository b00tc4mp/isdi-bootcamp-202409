import db from 'dat';

import deletePost from './deletePost.js';

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return deletePost('672e08451dfe72076c0ca52c', '6734d93ab2f9f68cc8957517')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())