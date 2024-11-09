import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, image, text) => {
  validate.id(userId, "userId");
  validate.image(image);
  validate.text(text);

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch((error) => {
      new Error(error.message);
    })
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .insertOne({
          author: ObjectId.createFromHexString(userId),
          image,
          text,
          likes: [],
          comments: [],
        })
        .then((_) => {
          console.log("Post creado con exito");
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    });
};
