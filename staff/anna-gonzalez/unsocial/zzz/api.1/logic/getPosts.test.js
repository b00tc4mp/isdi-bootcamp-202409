import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return getPosts('672e1ed8d36186d1eaf683b1')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, saved, saves, comments }) => ({ id, author, image, text, date, liked, likes, saved, saves, comments }))))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())