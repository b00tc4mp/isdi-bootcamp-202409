import { Category } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default () => {
  return (
    Category.find()
      .populate({
        path: "subcategories",
        model: "Subcategory",
      })
      // .lean()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((categories) => {
        if (!categories) throw new NotFoundError("categories not found");
        return categories;
      })
  );
};
