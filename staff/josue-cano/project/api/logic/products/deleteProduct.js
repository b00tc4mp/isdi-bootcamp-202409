import bcrypt from "bcryptjs";
import { User, Product } from "dat";
import { validate, errors } from "com";

const { NotFoundError, SystemError } = errors;

export default async ({ productId, userId }) => {
  console.log({ userId, productId });
  let result = null;
  try {
    result = await Product.deleteOne({ _id: productId, author: userId });
  } catch (err) {
    throw new SystemError(err.message);
  }

  if (result === null || result.deletedCount === 0) {
    throw new NotFoundError("No puedes borrar este producto");
  }
  return result;
};
