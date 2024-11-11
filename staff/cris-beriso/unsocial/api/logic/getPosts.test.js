import db from 'dat'
import getPosts from './getPosts.js'

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return getPosts('672e23c59b19f01fb4c38f37')
        .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())