import { getToken } from "../../utils/session";

export const addtoFavorites = (id) => {
  
  const token = `Bearer ${getToken()}`;
  return fetch(`http://${"localhost:8080"}/favorites/`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" , AUTHORIZATION: token },
    body: JSON.stringify({favorite: id}) 
  })
    .then((res) => {
      if (res.ok) {
        return res
          .json()
          .then((response) => {
            alert("Producto agregado a favoritos", response);
          })
          .catch((error) => {
            console.error(error);
            throw new Error("Error al procesar la respuesta del servidor.");
          });
      }
      // Si no está OK, maneja los errores del servidor
      return res.json().then(({ error }) => {
        debugger;
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
