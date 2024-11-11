import db from 'dat'

import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return removeComment('672e08451dfe72076c0ca52c', '672e84b46a17690bf3cb1f8f', '672f5a806de4afcb10896d6a')
                .then(() => console.log('comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())