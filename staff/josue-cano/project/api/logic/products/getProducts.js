import { Producto } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  return Producto.find()
   .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((producto) => {
      if (!`producto`) throw new NotFoundError("producto not found");
      return producto;
    });
};