import { User, Producto } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async ({ userId, keyword }) => {
  if (userId) {
    const user = await User.findOne({ _id: userId });

    const products = await Producto.find({ name: { $regex: `${keyword}`, $options: "i" } }).lean();
    const result = products.map((product) => ({
      ...product,
      isFavorite: user.favorites.includes(product._id),
    }));
    return result;
  }

  const products = await Producto.find({ name: { $regex: `${keyword}`, $options: "i" } }).lean();

  return products;
};
// TODO:createSpecs
