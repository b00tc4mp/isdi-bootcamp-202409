import db from 'dat'

import removeComment from './removeComment.js'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return removeComment('6734c629869a91c1bf87851b', '6734c629869a91c1bf87851d', '6734c629869a91c1bf87851e')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())