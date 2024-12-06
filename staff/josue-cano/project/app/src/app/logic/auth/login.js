// import { validate, errors } from "com";
import { redirect } from "next/navigation";

const login = ({ username, password }) => {
  // validate.username(username);
  // validate.password(password);
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
          .then((token) => {
            localStorage.token = token.token;
            redirect("/");
          });

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then(({ error, message }) => {
          //   throw new errors[error](message);
        });
    });
};

export default login;
