import db from 'dat'

import createComment from './createComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createComment('6734c629869a91c1bf87851b', '6734c629869a91c1bf87851d', 'soy un comentario')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())