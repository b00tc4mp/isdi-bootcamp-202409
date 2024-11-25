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

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    const { status, response } = xhr;

    if (status === 201) {
      callback(null);

      return;
    }

    const { error, message } = JSON.parse(response);

    const constructor = errors[error];

    callback(new constructor(message));
  });

  xhr.addEventListener("error", () =>
    callback(new SystemError("server error"))
  );

  xhr.open("POST", `${API_URL}/users`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name,
      email,
      username,
      password,
      passwordRepeat,
    })
  );
};
