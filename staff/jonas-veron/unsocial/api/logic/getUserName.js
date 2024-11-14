import { models } from "dat";
import { validate, errors } from "com";

const { User } = models;
const { NotFoundError, SystemError } = errors;

export default (userId, targetUserId) => {
  validate.id(userId, "userId");
  validate.id(targetUserId, "targetUserId");

  return User.findById(userId)
    .catch((error) => {
      new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return User.findById(targetUserId).catch((error) => {
        new SystemError(error.message);
      });
    })
    .then((user) => {
      if (!user) throw new NotFoundError("target user not found");

      return user.name;
    });
};
