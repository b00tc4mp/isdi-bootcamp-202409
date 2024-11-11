import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");

  const userObjectId = ObjectId.createFromHexString(userId);
  const postObjectId = ObjectId.createFromHexString(postId);

  return db.users
    .findOne({ _id: userObjectId })
    .catch((error) => {
      throw new Error(error.message);
    })

    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .findOne({ _id: postObjectId })
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((post) => {
          if (!post) throw new Error("post not found");
          if (post.author.toString() !== userId) {
            throw new Error("Este post no te pertenece");
          }
          return db.posts
            .deleteOne({
              _id: postObjectId,
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        })
        .then((_) => {});
    });
};
