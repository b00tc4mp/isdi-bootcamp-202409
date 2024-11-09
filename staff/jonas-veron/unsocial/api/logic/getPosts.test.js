import db from "dat";
import getPosts from "./getPosts.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      getPosts("672e0f93b5102bd54faa6e95")
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error);
