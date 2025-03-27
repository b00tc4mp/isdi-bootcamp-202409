import db from "../../dat/index.js";
import getUserName from "./getUserName.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return getUserName('67352702c7fb739a4ddf586a', '672e340e475e18ad6d8bad0f')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())