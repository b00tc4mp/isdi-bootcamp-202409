import { User, Product } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async ({userId, keyword}) => {
  // console.log({userId} );

  if (userId) {
    const user = await User.findOne({ _id: userId });
    

    const products = await Product.find({name: { $regex: `${keyword}` }}).lean();
    const result = products.map((product) => ({
      ...product,
      isFavorite: user.favorites.includes(product._id),
    }));
    return result;
  }

  const products = await Product.find({name: { $regex: `${keyword}` }}).lean();

  return products;

  // return Producto.find()
  //  .lean()
  //   .catch((error) => {
  //     throw new SystemError(error.message);
  //   })
  //   .then((producto) => {
  //     if (!`producto`) throw new NotFoundError("producto not found");
  //     return producto;
  //   });
  //
  // return products;
};
