import db from 'dat'

import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            toggleLikePost('672e2336dd171a9a6e9355d0', '672cea63a14bd241a52c11f9')
                .then(() => console.log('Post Liked'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    }).catch(console.error)