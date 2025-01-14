import bcrypt from "bcryptjs";
import { User, Product } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async ({ id }) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError("No se encontró un usuario con el ID proporcionado.");
    }
    const favorites = await Product.find({ _id: { $in: user.favorites } }).lean();

    return favorites.map((product) => ({
      ...product,
      isFavorite: true,
    }));
  } catch (error) {
    console.log(error);
  }
};
