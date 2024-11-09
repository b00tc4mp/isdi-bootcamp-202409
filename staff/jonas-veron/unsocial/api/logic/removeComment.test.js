import db from "dat";
import removeComment from "./removeComment.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      removeComment(
        "672e0f93b5102bd54faa6e95",
        "672f4c715f5175eac0203996",
        "672f5b4e4d941f4073d4c3ff"
      ).then(console.log("comentario eliminado"));
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error);
