
import { Product } from "dat";
import { errors, validate } from "com";

const { DuplicityError, SystemError } = errors;

export default async (product) => {
  try {
    validate.product(product);
  } catch (error) {
    return Promise.reject(error);
  }

  const existingProduct = await Product.findOne({ name: product.name });
  if (existingProduct) {
    throw new DuplicityError('product already exists');
  }
  const result = await Product.create(product);
  return result;

};


