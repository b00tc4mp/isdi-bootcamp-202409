import bcrypt from "bcryptjs";
import { User, Producto } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async ({ id }) => {
  console.log({ id });
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError("No se encontró un usuario con el ID proporcionado.");
    }
    const favorites = await Producto.find({ _id: { $in: user.favorites } }).lean();

    return favorites.map((product) => ({
      ...product,
      isFavorite: true,
    }));
  } catch (error) {
    console.log(error);
  }
};