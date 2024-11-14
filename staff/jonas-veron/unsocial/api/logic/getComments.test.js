import db from "dat";
import getComments from "./getComments.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      return getComments("673505cba2ae54c1b511dd7f", "673505cba2ae54c1b511dd82")
        .then(console.log)
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
