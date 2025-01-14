import bcrypt from "bcryptjs";
import { User, Product } from "dat";
import { errors } from "com";

const {SystemError} = errors;

export default async ({ id }) => {
  try {
    const user = await User.findOne({ _id: id });

    const favorites = await Product.find({ _id: { $in: user.favorites } });

    return favorites;
  } catch (error) {
    SystemError(error);
  }
};
