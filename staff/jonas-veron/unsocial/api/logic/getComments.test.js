import db from "dat";
import getComments from "./getComments.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test").then(() => {
  try {
    getComments("672e0f93b5102bd54faa6e95", "672f4aa087f9968fcab3f529")
      .then(console.log)
      .catch((error) => console.error(error.message));
  } catch (error) {
    console.error(error);
  }
});
