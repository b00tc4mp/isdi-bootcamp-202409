import { User, Producto } from "dat";
import { errors } from "com";

const { SystemError } = errors;

export default async (userId) => {
  console.log({ userId });

  try {
    const user = await User.findOne({ _id: userId });

    return user;
  } catch (error) {
    SystemError(error);
  }
};
