import db from 'dat'

import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            return toggleLikePost('672cd989fcf48026d6c1c190', '673227a7b813bddc776f0342')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)
    .finally(() => db.disconnect())