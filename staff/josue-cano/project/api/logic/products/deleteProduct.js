import { Product } from "dat";
import { errors, validate } from "com";

const { NotFoundError, SystemError } = errors;

export default async function deleteProduct({ productId, userId }) {
  validate.id(productId, "productId");
  validate.id(userId, "userId");

  try {
    await Product.findOne({ _id: productId, author: userId });
  } catch (err) {
    throw new NotFoundError("No puedes borrar este producto");
  }

  try {
    const result = await Product.deleteOne({ _id: productId, author: userId });
    return result;
  } catch (err) {
    throw new SystemError(err.message);
  }
}
