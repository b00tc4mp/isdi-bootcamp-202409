import db from 'dat'

import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            addComment('672e08451dfe72076c0ca52c', '672e84b46a17690bf3cb1f8f', 'comment2')
                .then(() => console.log('comment added'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)