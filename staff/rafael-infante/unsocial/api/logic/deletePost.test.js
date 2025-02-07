import db from "../../dat/index.js";
import deletePost from "./deletePost.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return deletePost('672e37081977fd9ccd6b520b', '6732411eda269d4883e151dc')
        .then(() => console.log('Post deleted'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

