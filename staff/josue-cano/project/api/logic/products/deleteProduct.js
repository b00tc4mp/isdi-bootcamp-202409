import { Product } from "dat";
import { errors, validate } from "com";

const { NotFoundError, SystemError } = errors;

export default async function deleteProduct({ productId, userId }) {
  validate.id(productId, "productId");
  validate.id(userId, "userId");

  const produc = await Product.findOne({ _id: productId, author: userId });

  if (!produc) {
    throw new NotFoundError("No puedes borrar este producto");
  }

  try {
    const result = await Product.deleteOne({ _id: productId, author: userId });
    return result;
  } catch (err) {
    throw new SystemError(err.message);
  }
}
