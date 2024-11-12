import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return toggleLikePost('672e228ed27d55a76e0d8190', '673219bfcab73932bcb2ab34')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
