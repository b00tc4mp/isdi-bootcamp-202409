import db from "../../dat/index.js";
import getUserName from "./getUserName.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return getUserName('672e340e475e18ad6d8bad0f', '672e37081977fd9ccd6b520b')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())