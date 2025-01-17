import { Category } from "dat";
import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors;

export default async () => {
  try {

    const categories = await Category.find().populate({
      path: "subcategories",
      model: "Subcategory",
    });

    if (categories.length === 0) {
      throw new NotFoundError("categories not found");
    }

    return categories;
  } catch (error) {
    throw new SystemError(error.message);
  }
};
