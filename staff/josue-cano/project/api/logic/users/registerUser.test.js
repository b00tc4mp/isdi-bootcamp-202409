import "dotenv/config";
import db from "dat";

import registerUser from "./registerUser.js";

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return registerUser("Josue", "Cano", "josuecano@gmail.com", "123123123", "123123123")
        .then(console.log) // undefined
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
