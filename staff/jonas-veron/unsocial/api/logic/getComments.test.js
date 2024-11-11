import db from "dat";
import getComments from "./getComments.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      return getComments("672e0f93b5102bd54faa6e95", "67322e3afb197533aef9ba7a")
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
