import deletePost from './deletePost.js'
import db from 'dat'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return deletePost('672e1cf7fbf40da8a565ff5d', '672e64b3e759055717e1c0b2')
                .then(() => console.log('post deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())