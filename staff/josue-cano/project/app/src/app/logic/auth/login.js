import { validate, errors } from "com";
import fetchHandler from "@/app/utils/handlers/fetchHandler";

const login = async ({ username, password }) => {
  const url = "login";

  // errores de validación
  try {
    validate.userName(username);
    validate.password(password);
  } catch (err) {
    return Promise.reject(err.message);
  }

  try {
    const response = await fetchHandler(
      url,
      {
        method: "post",
        body: JSON.stringify({ email: username, password }),
      },
      true
    );

    localStorage.token = response.data.token;
    localStorage.favorites = response.data.favorites;

    return true;
  } catch (error) {
    alert(error);
    return false;
  }

  // return fetch(`http://${"localhost:8080"}/login`, {
  //   method: "POST",
  //   headers: { "Content-type": "application/json" },
  //   body: JSON.stringify({ email: username, password }),
  // })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  //   .then((res) => {
  //     if (res.ok)
  //       return res
  //         .json()
  //         .catch((error) => {
  //           throw new SystemError(error.message);
  //         })
  //         .then((response) => {
  //           localStorage.token = response.data.token;
  //           localStorage.favorites = response.data.favorites;
  //           return true;
  //         });

  //     return res
  //       .json()
  //       .catch((error) => {
  //         throw new SystemError(error.message);
  //       })
  //       .then(({ error }) => {
  //         debugger;
  //         throw new Error(error)
  //       });
  //   });
};

export default login;
