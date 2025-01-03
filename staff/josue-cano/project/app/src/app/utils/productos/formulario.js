import { fetchCategories } from "@/app/logic/products/categories";
import { fetchSubCategories } from "@/app/logic/products/subcategories";

async function fetchCategorias(setCategorias, setSubCategorias) {
  await fetchCategories().then((categorias) => setCategorias(categorias));
  await fetchSubCategories().then((subcategorias) => setSubCategorias(subcategorias));
}

export { fetchCategorias };
