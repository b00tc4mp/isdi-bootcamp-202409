import { User, Product } from "dat";
import { errors, validate } from "com";

const { SystemError } = errors;
//VALIDAR USERID
export default async (userId) => {
  validate.id(userId, "userId");

  try {
    const user = await User.findOne({ _id: userId });

    return user;
  } catch (error) {
    SystemError(error);
  }
};
