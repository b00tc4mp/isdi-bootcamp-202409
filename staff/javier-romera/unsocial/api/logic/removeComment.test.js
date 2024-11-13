import db from 'dat'

import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return removeComment('672e08451dfe72076c0ca52c', '6731042647dc73841f417602', '6734e036bef675c0a939ed8e')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())