import toggleLikePost from './toggleLikePost.js'

import db from 'dat'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            toggleLikePost('672e3058090fcae7fd450528', '672f6cd403484df2359a9893')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)