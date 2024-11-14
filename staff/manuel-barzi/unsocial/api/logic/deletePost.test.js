import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return deletePost('6734991dbf16fcdc897ef6fc', '67349b080b678d07e6c58755')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())