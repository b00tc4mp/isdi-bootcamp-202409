import db from 'dat'

import removeComment from './removeComment.js'

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
    .then(() => {
        try {
            return removeComment("672e2c487f1acbd7a5009c67", "67321930d260445bfba74342", "6732267a7b1efe270b964d5b")
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())