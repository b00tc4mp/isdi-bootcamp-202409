import deletePost from './deletePost.js'

import db from 'dat'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return deletePost('672e3058090fcae7fd450528', '673105188c206e156456a801')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())