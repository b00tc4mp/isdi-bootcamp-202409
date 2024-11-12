import db from 'dat'

import addComment from './addComment.js'

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
    .then(() => {
        try {
            return addComment("672e20b8106be73d00f7ee7b", "67321930d260445bfba74342", "Grande Boliva"
            )
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())