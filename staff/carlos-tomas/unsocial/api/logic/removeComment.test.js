import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return removeComment('6734dff58c977eb9bcf0c075', '6734e7ffc60d56fe5041b5ac', '6735d79f4185451db298460f')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
