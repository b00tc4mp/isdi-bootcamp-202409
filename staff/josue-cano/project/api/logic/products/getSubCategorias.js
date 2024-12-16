import { Subcategoria } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  return (
    Subcategoria.find()
      //.populate('idCategoria')
      .lean()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((subcategorias) => {
        if (!subcategorias) throw new NotFoundError("categorias not found");
        return subcategorias;
      })
  );
};
