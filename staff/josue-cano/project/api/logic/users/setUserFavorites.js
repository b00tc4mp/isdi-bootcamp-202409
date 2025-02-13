import { User } from "dat";
import { validate, errors } from "com";

const { SystemError, ValidationError } = errors;

export default async ({ id, favorite }) => {
  validate.id(id, "id");
  try {
    let updatedUser = null;
    const user = await User.findOne({ _id: id });

    if (user) {
      if (user.favorites.some((f) => f == favorite)) {
        updatedUser = await User.findByIdAndUpdate({ _id: id }, { $pull: { favorites: favorite } }, { new: true });
      } else {
        updatedUser = await User.findByIdAndUpdate({ _id: id }, { $addToSet: { favorites: favorite } }, { new: true });
      }
    }

    return updatedUser;
  } catch (error) {}
};
