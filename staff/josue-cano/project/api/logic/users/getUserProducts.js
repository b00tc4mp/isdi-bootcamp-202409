import { User, Producto } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (userId) => {
  if (userId) {
    const products = await Producto.find({ author: userId }).lean();
    return products;
  }

  const products = await Producto.find();
  return products;
};
