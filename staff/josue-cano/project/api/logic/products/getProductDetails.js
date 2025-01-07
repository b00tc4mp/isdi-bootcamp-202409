import { Producto, User } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (id, userId) => {
  console.log(id);
  try {
    const product = await Producto.findOne({ _id: id }).lean();
    let isFavorite = false;
    if (userId) {
      const user = await User.findOne({ _id: userId });

      isFavorite = user.favorites.includes(id);
    }
    return {
      ...product,
      isFavorite,
    };
  } catch (e) {
    console.log(e);
  }
};
// TODO:createSpecs