import db from 'dat';

import deletePost from './deletePost.js';

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return deletePost('672e08451dfe72076c0ca52c', '672e933dbd831ed95dda0870')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())