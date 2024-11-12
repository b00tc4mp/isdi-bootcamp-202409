import db from "dat";
import getUserName from "./getUserName.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
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
