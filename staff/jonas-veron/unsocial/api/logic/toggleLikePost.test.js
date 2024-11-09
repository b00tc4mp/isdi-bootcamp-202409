import db from "dat";

import toggleLikePost from "./toggleLikePost.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      toggleLikePost(
        "672e0f93b5102bd54faa6e95",
        "672f4aa087f9968fcab3f529"
      ).then(() => console.log("OK"));
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error);
