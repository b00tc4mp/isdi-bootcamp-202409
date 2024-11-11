import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, postId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");

  const objectUserId = new ObjectId(userId);

  return db.users
    .findOne({ _id: objectUserId })
    .catch((error) => new Error(error.message))
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .findOne({ _id: new ObjectId(postId) })
        .catch((error) => new Error(error.message))
        .then((post) => {
          if (!post) throw new Error("post not found");

          const { comments } = post;

          const promises = comments.map((comment) => {
            const { author: authorId } = comment;
            return db.users
              .findOne({ _id: authorId }, { username: 1 })
              .then((user) => {
                if (!user) throw new Error("user not found");
                const { username } = user;
                comment.author = { id: authorId, username };

                comment.id = comment._id.toString();
                delete comment._id;
                return comment;
              });
          });
          return Promise.all(promises);
        });
    });
};
