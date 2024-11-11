import db from 'dat'

import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return addComment('672e08451dfe72076c0ca52c', '672e84b46a17690bf3cb1f8f', 'comment3')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())