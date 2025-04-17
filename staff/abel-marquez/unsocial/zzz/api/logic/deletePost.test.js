import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return deletePost('672e025c405e99414c72a716', '6731d0771cde96a6b6ca0f65')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())