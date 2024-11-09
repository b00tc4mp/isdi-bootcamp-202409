import db from "dat";
import deletePost from "./deletePost.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      deletePost("672e0f93b5102bd54faa6e95", "672f4c715f5175eac0203996").then(
        console.log("post eliminado con exito")
      );
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error);
