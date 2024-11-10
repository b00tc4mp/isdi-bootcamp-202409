import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId) => {
  validate.id(userId, "userId");

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .catch((error) => new Error(error.message))
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts.find().toArray();
    })
    .then((posts) => {
      return db.users
        .find()
        .toArray()
        .then((users) => {
          posts.forEach((post) => {
            const { author: authorId, likes, comments } = post;

            const { username } = users.find(({ _id }) => _id.equals(authorId));

            post.author = { _id: authorId, username };

            post.liked = likes.some((id) =>
              id.equals(ObjectId.createFromHexString(userId))
            );

            post.comments = comments.length;
          });
          return posts.toReversed();
        });
    });
};
