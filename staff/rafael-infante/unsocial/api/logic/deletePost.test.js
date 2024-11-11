import db from "../../dat/index.js";
import deletePost from "./deletePost.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      deletePost('672e587fd5d1fe4cf716c1ce', '672e61fd871193566bd665c5')
        .then(() => console.log('Post deleted'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })

