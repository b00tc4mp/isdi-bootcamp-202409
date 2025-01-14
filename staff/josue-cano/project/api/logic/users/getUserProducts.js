import { User, Product } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (userId) => {
  if (userId) {
    const products = await Product.find({ author: userId }).lean();

    return products;
  }

  const products = await Product.find();
  return products;
};
