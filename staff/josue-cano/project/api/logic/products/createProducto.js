import bcrypt from "bcryptjs";
import { User, Producto } from "dat";
import { errors } from "com";

const { DuplicityError, SystemError } = errors;

export default (producto) => {
  // console.log({object: Object.keys(Producto.schema.paths)})
  // console.log(producto);
  try {
    return Producto.create(producto)
      .then((producto) => producto)
      .catch((error) => {
        console.log({ error });
        if (error.code === 11000) throw new DuplicityError("product already exists");

        throw new SystemError(error.message);
      });
  } catch (err) {
    // return Promise.reject para emitir una promesa de respuesta fallida
    // Los valores de respuesta pueden ser: resolve = exito, reject = fallo
    return Promise.reject(err.message);
  }
};