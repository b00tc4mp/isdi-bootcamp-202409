import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, postId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .findOne({ _id: ObjectId.createFromHexString(postId) })
        .then((post) => {
          if (!post) throw new Error("post not found");

          const userObjecId = ObjectId.createFromHexString(userId);
          const alreadyLiked = post.likes.some((like) =>
            like.equals(userObjecId)
          );

          if (alreadyLiked) {
            return db.posts
              .updateOne(
                { _id: ObjectId.createFromHexString(postId) },
                { $pull: { likes: userObjecId } }
              )
              .then(() => console.log("like eliminado"));
          } else {
            return db.posts
              .updateOne(
                { _id: ObjectId.createFromHexString(postId) },
                { $push: { likes: userObjecId } }
              )
              .then(() => console.log("like agregado"));
          }
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    });
};
