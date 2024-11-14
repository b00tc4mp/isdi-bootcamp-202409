import { models } from "dat";
import { validate, errors } from "com";

const { User, Post } = models;

const { NotFoundError, SystemError } = errors;

export default (userId, postId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");

  return User.findById(userId)
    .catch((error) => new SystemError(error.message))
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return Post.findById(postId)
        .catch((error) => new SystemError(error.message))
        .then((post) => {
          if (!post) throw new NotFoundError("post not found");

          const { comments } = post;

          const promises = comments.map((comment) => {
            const { author: authorId } = comment;
            return User.findById(authorId, { username: 1 }).then((user) => {
              if (!user) throw new NotFoundError("user not found");
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
