import { User, Producto } from "dat";
import { validate, errors } from "com";

const { DuplicityError, SystemError, ValidationError } = errors;

export default async (userId) => {
  console.log({ userId });

  try {
    const user = await User.findOne({ _id: userId });

    return user;
  } catch (error) {
    console.log(error);
  }
};
