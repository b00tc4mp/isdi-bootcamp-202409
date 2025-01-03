import authenticateUser from "./authenticateUser.js";
import db from "../../dat/index.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return authenticateUser('camiloses', '123123123')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

