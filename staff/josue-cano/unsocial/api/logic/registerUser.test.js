import db from "dat";

import registerUser from "./registerUser.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test")
  .then(() => {
    try {
      return registerUser(
        "goku",
        "goku@gmail.com",
        "goku",
        "123123123",
        "123123123"
      )
        .then(console.log('registered'))
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());
