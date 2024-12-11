
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
      debugger;
      if (res.ok)
        return res
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((response) => {
            debugger;
            localStorage.token = response.data.token;
            return true;
            // redirect("/");
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
