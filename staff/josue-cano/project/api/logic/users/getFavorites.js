import bcrypt from "bcryptjs";
import { User, Product } from "dat";
import { errors, validate } from "com";

const { SystemError } = errors;
//VALIDAR ID
export default async ({ id }) => {
  validate.id(id);
  try {
    const user = await User.findById(id);

    if (!user) throw new Error("user not found");

    const favorites = await Product.find({ _id: { $in: user.favorites } });

    return favorites;
  } catch (error) {
    throw new SystemError(error.message);
  }
};
