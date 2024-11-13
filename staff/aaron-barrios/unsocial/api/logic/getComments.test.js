import db from 'dat'

import getComments from './getComments.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getComments('6734c629869a91c1bf87851b', '6734c629869a91c1bf87851d')
                .then(comments => console.log(comments.map(({ id, author, text, date }) => ({ id, author, text, date }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

