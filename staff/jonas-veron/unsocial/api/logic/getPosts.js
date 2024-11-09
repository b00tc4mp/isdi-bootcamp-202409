import db from "dat";
import { validate } from "com";

const { ObjectId } = db;

export default (userId) => {
  validate.id(userId, "userId");

  return db.users
    .findOne({ _id: ObjectId.createFromHexString(userId) })
    .then((user) => {
      if (!user) throw new Error("user not found");

      return db.posts.find().toArray();
    })
    .then((posts) => {
      const updatedPosts = posts.map((post) => {
        const authorId = post.author;

        return db.users
          .findOne({ _id: ObjectId.createFromHexString(authorId) })
          .then((author) => {
            console.log(author);
            if (author) {
              post.author = { id: author._id, username: author.username };
            }

            post.liked = post.likes.includes(userId);
            post.comments = post.comments.length;

            return post;
          });
      });
      return Promise.all(updatedPosts);
    })
    .then((updatedPosts) => updatedPosts.reverse())
    .catch((error) => {
      throw new Error(error.message);
    });
};
