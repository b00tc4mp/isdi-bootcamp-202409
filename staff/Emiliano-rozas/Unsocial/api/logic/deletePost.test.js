import db from 'dat'

import deletePost from './deletePost.js'


db.connect('mongodb://127.0.0.1:27017/unsocial')

    .then(() => {
        try {
            deletePost('672ca3dd3dbfe92085400b8c', '672cd186cd209e1d9b0d8190')
                .then(() => console.log('Post deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)

        }
    }).catch(console.error)
