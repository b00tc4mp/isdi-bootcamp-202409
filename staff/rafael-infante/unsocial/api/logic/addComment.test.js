import db from "../../dat/index.js"
import addComment from "./addComment.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return addComment('67338cd38612f745b9849a7e', 'Me gustan tus gafas', '672e340e475e18ad6d8bad0f')
        .then(() => console.log('comment added'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

