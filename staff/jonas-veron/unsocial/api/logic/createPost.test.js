import db from "dat";

import createPost from "./createPost.js";

db.connect("mongodb://127.0.0.1:27017/unsocial-test").then(() => {
  try {
    createPost(
      "672e0f93b5102bd54faa6e95",
      "https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg",
      "holaaaaaa mundo!!!!!!!"
    )
      .then()
      .catch((error) => console.error(error.message));
  } catch (error) {
    console.error(error);
  }
});
