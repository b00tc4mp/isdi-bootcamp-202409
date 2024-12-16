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
      // console.log({id, favorites: user.favorites, isFavorite});
    }

    return {
      ...product,
      isFavorite,
    };
  } catch (e) {
    console.log(e);
  }

  // return Producto.findOne({ _id: id })
  //   .lean()
  //   .catch((error) => {
  //     throw new SystemError(error.message);
  //   })
  //   .then((producto) => {
  //     if (!`producto`) throw new NotFoundError("producto not found");
  //     return producto;
  //   });
};
