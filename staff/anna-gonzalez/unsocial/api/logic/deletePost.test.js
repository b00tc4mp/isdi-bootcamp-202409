import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return deletePost('672e1ed8d36186d1eaf683b1', '672e33294049f022635a1d6d')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())