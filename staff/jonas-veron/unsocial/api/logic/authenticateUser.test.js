import db from "dat";
import authenticateUser from "./authenticateUser.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test").then(() => {
  try {
    console.log(authenticateUser("jonasveronn", "123123123"));
  } catch (error) {
    console.error(error);
  }
});
