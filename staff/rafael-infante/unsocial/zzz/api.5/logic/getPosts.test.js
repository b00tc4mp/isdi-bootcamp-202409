import db from "../../dat/index.js"
import getPosts from "./getPosts.js"

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return getPosts('672e587fd5d1fe4cf716c1ce')
        .then(posts => console.log(posts.map(({ id, author, image, text, date, liked, likes, comments }) => ({ id, author, image, text, date, liked, likes, comments }))))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())


