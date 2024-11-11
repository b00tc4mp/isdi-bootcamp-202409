import removeComment from './removeComment.js'

import db from 'dat'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return removeComment('672e3058090fcae7fd450528', '672f6cd403484df2359a9893', '672f7f1e00db1719f9ed76e2')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())