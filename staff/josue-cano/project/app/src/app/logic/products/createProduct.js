import { getToken } from "../../utils/session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const createProduct = (product) => {
  const token = `Bearer ${getToken()}`;

  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Para las imágenes
      value.filter(Boolean).forEach((image) => {
        formData.append("images[]", image.file);
      });
    } else {
      formData.append(key, value);
    }
  });

  return fetch(`${baseUrl}/products`, {
    method: "POST",
    headers: {
      AUTHORIZATION: token,
    },
    body: formData,
  })
    .then(async (res) => {
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Error desconocido en la creación del producto.");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error; // lanzamos el error para que lo maneje el componente
    });
};
