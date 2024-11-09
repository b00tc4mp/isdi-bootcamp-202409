import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId, postId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts
        .findOne({ _id: ObjectId.createFromHexString(postId) })
        .then((post) => {
          if (!post) throw new Error("post not found");
        });
    });

  if (!found) throw new Error("user not found");

  const post = posts.find((post) => post.id === postId);

  if (!post) throw new Error("Post not found");

  const { comments } = post;

  comments.forEach((comment) => {
    const { author: authorId } = comment;

    const { username } = users.find(({ id }) => id === authorId);

    comment.author = { id: authorId, username };
  });

  return comments;
};
