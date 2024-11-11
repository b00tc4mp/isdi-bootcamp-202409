import db from "../../dat/index.js"
import addComment from "./addComment.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      addComment('6732411eda269d4883e151dc', 'Leooo', '672e340e475e18ad6d8bad0f')
        .then(() => console.log('comment added'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })

