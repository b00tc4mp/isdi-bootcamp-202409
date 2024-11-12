import db from "dat";
import addComment from "./addComment.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      return addComment(
        "672e0f93b5102bd54faa6e95",
        "67322e3afb197533aef9ba7a",
        "PRUEBA!"
      )
        .then(console.log("comment added"))
        .catch((error) => console.error(error.message));
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
