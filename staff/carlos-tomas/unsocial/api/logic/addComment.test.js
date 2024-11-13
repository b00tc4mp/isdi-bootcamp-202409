import db from 'dat'
import addComment from './addComment.js'


db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return addComment('672e228ed27d55a76e0d8190', '67331325ff2f8a4190a7f889', 'wow!')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())