import db from "../../dat/index.js"
import getComments from "./getComments.js"

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return getComments('67352702c7fb739a4ddf586a', '6736094edeb9264dd0dafa35')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

