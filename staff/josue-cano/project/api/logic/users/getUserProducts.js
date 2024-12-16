import { User, Producto } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async (userId) => {
  // console.log({userId} );

  if (userId) {
    // const user = await User.findOne({_id:userId});

    const products = await Producto.find({ author: userId }).lean();
    // const result =  products.map(product => ({
    //   ...product,
    //   isFavorite: user.favorites.includes(product._id)
    // }));
    return products;
  }

  const products = await Producto.find();
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
