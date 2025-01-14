import { Subcategory } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  return (
    Subcategory.find()
      //.populate('idCategoria')
      .lean()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((subcategories) => {
        if (!subcategories) throw new NotFoundError("categories not found");
        return subcategories;
      })
  );
};
