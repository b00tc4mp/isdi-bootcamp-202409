import db from 'dat'

import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            toggleLikePost('67337ee4a973736edc8d92c8', '67337f1ea973736edc8d92cc')
                .then(() => console.log('Post Liked'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)