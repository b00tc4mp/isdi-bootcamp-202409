import "dotenv/config";
import db from "dat";
import addComment from "./addComment.js";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addComment(
        "673505cba2ae54c1b511dd7f",
        "673505cba2ae54c1b511dd82",
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
