import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, postId, commentId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");
  validate.id(commentId, "commentId");

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch((error) => new Error(error.message))
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .findOne({ _id: ObjectId.createFromHexString(postId) })
        .then((post) => {
          if (!post) throw new Error("post not found");

          const { comments } = post;
          const comment = comments.find(
            (comment) => comment._id.toString() === commentId
          );

          if (!comment) throw new Error("comment not found");
          if (comment.author.toString() !== userId) {
            throw new Error("user is not author");
          }
          return db.posts.updateOne(
            { _id: ObjectId.createFromHexString(postId) },
            {
              $pull: {
                comments: { _id: ObjectId.createFromHexString(commentId) },
              },
            }
          );
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    });
};
