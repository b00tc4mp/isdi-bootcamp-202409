import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return toggleLikePost('6734dff58c977eb9bcf0c075', '6734e7ffc60d56fe5041b5ac')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
