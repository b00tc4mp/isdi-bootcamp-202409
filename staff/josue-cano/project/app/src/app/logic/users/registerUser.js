export const registerUser = ({
  firstName,
  lastName,
  email,
  ubicacion,
  password,
  passwordRepeat,
}) => {
  return fetch(`http://${"localhost:8080"}/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      ubicacion,
      password,
      passwordRepeat
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res
        .json()
        .then((response) => {
          alert("Registro exitoso. Ahora puede iniciar sesión.", response);
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