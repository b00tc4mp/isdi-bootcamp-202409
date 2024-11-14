import db from 'dat'
import addComment from './addComment.js'


db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return addComment('6734dff58c977eb9bcf0c075', '6734e7ffc60d56fe5041b5ac', 'wow!')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())