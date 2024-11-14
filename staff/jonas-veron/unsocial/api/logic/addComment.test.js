import "dotenv/config";
import db from "dat";
import addComment from "./addComment.js";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addComment(
        "672e0f93b5102bd54faa6e95",
        "6734d59e8276dbe6b4d7e4b6",
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
