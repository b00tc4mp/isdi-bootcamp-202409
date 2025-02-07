import 'dotenv/config'
import authenticateUser from "./authenticateUser.js";
import db from "dat";

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return authenticateUser('leopoldo', '123123123')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

