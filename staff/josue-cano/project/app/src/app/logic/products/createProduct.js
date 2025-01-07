import { getToken } from "../../utils/session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const createProduct = (product) => {
  const token = `Bearer ${getToken()}`;

  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    console.log({ key, value });

    if (Array.isArray(value)) {
      // images array
      value.filter((x) => x).forEach((image) => formData.append(`images[]`, image.file));
    } else {
      formData.append(key, value);
    }
  });

  return fetch(`${baseUrl}/products`, {
    method: "POST",
    headers: { AUTHORIZATION: token },
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        return res
          .json()
          .then((response) => {
            alert("Producto creado correctamente", response);
          })
          .catch((error) => {
            console.error(error);
            throw new Error("Error al procesar la respuesta del servidor.");
          });
      }
      // Si no está OK, maneja los errores del servidor
      return res.json().then(({ error }) => {
        console.error(`${error}`);
        throw new Error(error || "Error desconocido en el registro.");
      });
    })
    .catch((error) => {
      console.error(error);
      alert(`Error en el registro: ${error.message}`);
      throw new Error(message || "Error desconocido en el registro.");
    });
};
