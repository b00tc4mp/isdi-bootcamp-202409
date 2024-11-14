import "dotenv/config";
import db from "dat";
import getUserName from "./getUserName.js";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getUserName("672e0f93b5102bd54faa6e95", "672e2a5c7c09ff2305e3552a")
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
