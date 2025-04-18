import "dotenv/config";
import db from "dat";
import deletePost from "./deletePost.js";

db.connect(process.env.MONGO_URL_TEST)
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
