import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://localhost:27017/unsocial')
    .then(() => {
        try {
            return getPosts('673504d23131d3523c5172ec')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
