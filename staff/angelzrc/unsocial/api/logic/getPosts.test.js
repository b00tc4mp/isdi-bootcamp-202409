import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://localhost:27017/unsocial')
    .then(() => {
        try {
            getPosts('672cd8e6fcf48026d6c1c18e')
                .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
/* .finally(() => db.disconnect()) */
