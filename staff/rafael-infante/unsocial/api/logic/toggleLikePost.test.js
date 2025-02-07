import db from "../../dat/index.js"
import toggleLikePost from "./toggleLikePost.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return toggleLikePost('67323f88da269d4883e151db', '6736094edeb9264dd0dafa35')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())