import { fetchCategories } from "@/app/logic/products/categories";
import { fetchSubCategories } from "@/app/logic/products/subcategories";

async function getCategories(setCategories, setSubCategories) {
  await fetchCategories().then((categories) => setCategories(categories));
  await fetchSubCategories().then((subcategories) => setSubCategories(subcategories));
}

export { getCategories };
