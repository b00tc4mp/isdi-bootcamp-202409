import bcrypt from "bcryptjs";
import { User, Producto } from "dat";
import { errors } from "com";

const {SystemError} = errors;

export default async ({ id }) => {
  console.log({ id });
  try {
    const user = await User.findOne({ _id: id });

    const favorites = await Producto.find({ _id: { $in: user.favorites } });

    return favorites;
  } catch (error) {
    SystemError(error);
  }
};
// TODO:createSpecs