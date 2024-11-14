import "dotenv/config";
import db from "dat";

import toggleLikePost from "./toggleLikePost.js";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return toggleLikePost(
        "672e0f93b5102bd54faa6e95",
        "6734d59e8276dbe6b4d7e4b6"
      )
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
