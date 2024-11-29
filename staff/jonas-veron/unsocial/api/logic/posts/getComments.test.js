import "dotenv/config";
import db from "dat";
import getComments from "./getComments.js";

db.connect(process.env.MONGO_URL_TEST)
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
