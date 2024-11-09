import deletePost from './deletePost.js'

import db from 'dat'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            deletePost('672e3058090fcae7fd450528', '672e3f37542b0762f3bd1094')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)