
import { validate, errors } from "com";
import { redirect } from "next/navigation";

const login = ({ username, password }) => {
  // errores de validación
  try {
    validate.userName(username);
    validate.password(password);
    console.log({ validate, errors });
  } catch (err) {
    return Promise.reject(err.message);
  }
  return fetch(`http://${"localhost:8080"}/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email: username, password }),
  })
    .catch((error) => {
      console.log(error);
    })
    .then((res) => {
      if (res.ok)
        return res
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((response) => {
            localStorage.token = response.data.token;
            localStorage.favorites = response.data.favorites;
            return true;
          });

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then(({ error }) => {
          debugger;
          throw new Error(error)
        });
    });
};

export default login;
