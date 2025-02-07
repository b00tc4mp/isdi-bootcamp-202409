import db from "../../dat/index.js"
import getComments from "./getComments.js"

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return getComments('672e587fd5d1fe4cf716c1ce', '6732411eda269d4883e151dc')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

