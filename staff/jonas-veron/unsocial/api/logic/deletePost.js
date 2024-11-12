import db from "dat";
import { validate, errors } from "com";

const { ObjectId } = db;
const { NotFoundError, SystemError, OwnershipError } = errors;

export default (userId, postId) => {
  validate.id(postId, "postId");
  validate.id(userId, "userId");

  const userObjectId = ObjectId.createFromHexString(userId);
  const postObjectId = ObjectId.createFromHexString(postId);

  return db.users
    .findOne({ _id: userObjectId })
    .catch((error) => {
      throw new SystemError(error.message);
    })

    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return db.posts
        .findOne({ _id: postObjectId })
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((post) => {
          if (!post) throw new NotFoundError("post not found");
          if (post.author.toString() !== userId) {
            throw new OwnershipError("Este post no te pertenece");
          }
          return db.posts
            .deleteOne({
              _id: postObjectId,
            })
            .catch((error) => {
              throw new SystemError(error.message);
            });
        })
        .then((_) => {});
    });
};
