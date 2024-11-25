import db from 'dat'

import deletePost from './deletePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            (deletePost('6734dff58c977eb9bcf0c075', '6734e477f570aab72740c6e2'))
                .then(console.log)
        } catch (error) {
            console.error(error)
        }

    })
    .catch(console.error)

