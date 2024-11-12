import db from "dat";
import removeComment from "./removeComment.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      return removeComment(
        "672e0f93b5102bd54faa6e95",
        "67322e3afb197533aef9ba7a",
        "6733617db5021f3a8feb4a4d"
      )
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
