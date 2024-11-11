import db from "../../dat/index.js"
import removeComment from "./removeComment.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      removeComment('672e37081977fd9ccd6b520b', '672f8865f874ca78606e9cd9', '672fc7893ef838c976e243cd')
        .then(() => console.log('comment deleted'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })