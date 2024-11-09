import db from 'dat'

import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            removeComment('672e08451dfe72076c0ca52c', '672e84b46a17690bf3cb1f8f', '672f4e3386e292e7566e5d70')
                .then(() => console.log('comment deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)