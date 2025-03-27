import db from "../../dat/index.js"
import removeComment from "./removeComment.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return removeComment('672e340e475e18ad6d8bad0f', '6736094edeb9264dd0dafa35', '6736414f62c4037a1d8191ca')
        .then(() => console.log('comment deleted'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())