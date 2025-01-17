import { Product, User } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (id, userId) => {
  if (id) validate.id(id, "id");
  if (userId) validate.id(userId, "userId");

  try {
    const product = await Product.findOne({ _id: id })
      .populate({ path: "author", model: "User", populate: { path: "location", model: "Location" } })
      .lean();
    let isFavorite = false;
    if (userId) {
      const user = await User.findOne({ _id: userId });

      isFavorite = user.favorites.includes(id);
    }
    return {
      ...product,
      isFavorite,
    };
  } catch (e) {}
};
