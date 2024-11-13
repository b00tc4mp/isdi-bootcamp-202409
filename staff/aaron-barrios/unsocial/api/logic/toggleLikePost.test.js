import db from 'dat'

import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return toggleLikePost('6734c629869a91c1bf87851b', '6734c629869a91c1bf87851d')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())