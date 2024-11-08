import db from "../../dat/index.js";
import registerUser from "./registerUser.js";

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      registerUser('Leo Poldo', 'leo@poldo.com', 'leopoldo', '123123123', '123123123')
        .then(() => console.log('user registered'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })