import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch((error) => {
      new Error(error.message);
    })

    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .findOne({ _id: ObjectId.createFromHexString(postId) })
        .then((post) => {
          if (!post) throw new Error("post not found");
          if (post.author.toString() !== userId) {
            throw new Error("Este post no te pertenece");
          }
          return db.posts
            .deleteOne({
              _id: ObjectId.createFromHexString(postId),
            })
            .then((_) => {})
            .catch((error) => {
              throw new Error(error.message);
            });
        });
    });
};
