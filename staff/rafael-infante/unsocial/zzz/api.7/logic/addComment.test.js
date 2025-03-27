import db from "../../dat/index.js"
import addComment from "./addComment.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return addComment('6736094edeb9264dd0dafa35', 'prueba3', '672e37081977fd9ccd6b5200')
        .then(() => console.log('comment added'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

