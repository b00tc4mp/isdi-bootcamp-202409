import db from "../../dat/index.js";
import deletePost from "./deletePost.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return deletePost('672e340e475e18ad6d8bad0f', '67338cd38612f745b9849a7e')
        .then(() => console.log('Post deleted'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

