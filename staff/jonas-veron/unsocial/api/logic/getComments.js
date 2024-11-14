import { models } from "dat";
import { validate, errors } from "com";

const { User, Post } = models;

const { NotFoundError, SystemError } = errors;

export default (userId, postId) => {
  validate.id(userId, "userId");
  validate.id(postId, "postId");

  return Promise.all([
    User.exists({ _id: userId }),
    Post.findById(postId)
      .populate("author", "username")
      .populate("comments.author", "username")
      .lean(),
  ])
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then(([userExists, post]) => {
      if (!userExists) throw new NotFoundError("user not found");
      if (!post) throw new NotFoundError("post not found");

      const { comments } = post;

      comments.forEach((comment) => {
        comment.id = comment._id.toString();
        delete comment._id;

        const { author } = comment;

        if (author.id) {
          author.id = author._id.toString();
        }
      });
      return comments;
    });
};
