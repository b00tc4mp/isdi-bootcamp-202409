import { validate, errors } from "com";
import { API_URL } from "@env";

const { SystemError } = errors;

export default (name, email, username, password, passwordRepeat, callback) => {
  validate.name(name);
  validate.email(email);
  validate.username(username);
  validate.password(password);
  validate.passwordsMatch(password, passwordRepeat);
  validate.callback(callback);

  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      username,
      password,
      "password-repeat": passwordRepeat,
    }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((res) => {
      if (res.ok) return;

      return res
        .json()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then(({ error, message }) => {
          throw new errors[error](message);
        });
    });
};
