import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return deletePost('673102adab634f097e0719f9', '673221a592d398cd3b866f46')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())