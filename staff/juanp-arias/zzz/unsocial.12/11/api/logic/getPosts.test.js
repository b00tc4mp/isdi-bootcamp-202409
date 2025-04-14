import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return getPosts('672e1cf7fbf40da8a565ff5d')
                .then(posts => console.log(posts))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())