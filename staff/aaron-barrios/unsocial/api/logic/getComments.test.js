import db from 'dat'

import getComments from './getComments.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getComments('672e3058090fcae7fd450528', '67336a1e7b45b1fef62ecd3a')
                .then(comments => console.log(comments.map(({ id, author, text, date }) => ({ id, author, text, date }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())

