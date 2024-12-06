import { Categoria } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  return Categoria.find()
    .populate("categorias")
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((categorias) => {
      if (!categorias) throw new NotFoundError("categorias not found");
      return categorias;
    });
};
