import "dotenv/config";
import db from "dat";
import removeComment from "./removeComment.js";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return removeComment(
        "673505cba2ae54c1b511dd7f",
        "673505cba2ae54c1b511dd82",
        "673505cba2ae54c1b511dd83"
      )
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
