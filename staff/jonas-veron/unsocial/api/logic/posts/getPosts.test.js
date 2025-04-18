import "dotenv/config";
import db from "dat";
import getPosts from "./getPosts.js";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getPosts("672e0f93b5102bd54faa6e95")
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
