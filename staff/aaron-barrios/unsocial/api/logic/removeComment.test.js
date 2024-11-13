import db from 'dat'

import removeComment from './removeComment.js'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return removeComment('672e3058090fcae7fd450528', '67336a1e7b45b1fef62ecd3a', '67336e03cd24ebc4c079b087')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())