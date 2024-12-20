import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getPosts('672e0237405e99414c72a715')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())