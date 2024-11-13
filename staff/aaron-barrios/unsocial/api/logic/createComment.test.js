import db from 'dat'

import createComment from './createComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createComment('672e3058090fcae7fd450528', '67336a1e7b45b1fef62ecd3a', 'soy un comentario')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())