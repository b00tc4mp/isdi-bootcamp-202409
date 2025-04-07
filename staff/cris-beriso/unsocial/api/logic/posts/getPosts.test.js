import 'dotenv/config'
import db from 'dat'
import getPosts from './getPosts.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return getPosts('673cc3a51497fb3a22020dcb')
        .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())