import db from 'dat'

import deletePost from './deletePost.js'


db.connect('mongodb://127.0.0.1:27017/unsocial')

    .then(() => {
        try {
            deletePost('67321cb077f45c936bc2b2a0', '6734de734ec863c7d3b9d238')
                .then(() => console.log('Post deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)

        }
    }).catch(console.error)
