import db from 'dat'

import getComments from './getComments.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            getComments('672e08451dfe72076c0ca52c', '672e84b46a17690bf3cb1f8f')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)