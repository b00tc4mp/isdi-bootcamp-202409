import db from "dat";
import deletePost from "./deletePost.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      return deletePost("672e0f93b5102bd54faa6e95", "6734df3cc28594f499e0b8eb")
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
