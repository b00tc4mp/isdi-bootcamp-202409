import db from "../../dat/index.js"
import createPost from "./createPost.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return createPost('67323f88da269d4883e151db', 'https://gratisography.com/wp-content/uploads/2023/09/gratisography-duck-doctor-free-stock-photo-1170x780.jpg', 'esto es PATOdalavida')
        .then(() => console.log('post created'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())