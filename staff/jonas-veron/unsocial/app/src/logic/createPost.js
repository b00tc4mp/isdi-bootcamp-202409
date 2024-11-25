import { validate, errors } from "com";

const { SystemError } = errors;

export default (image, text) => {
  validate.image(image);
  validate.text(text);

  return fetch(`http://${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image, text }),
  })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((res) => {
      if (res.ok) return;

      return res.json().catch((error) => {
        throw new SystemError(error.message).then(({ error, message }) => {
          throw new errors[error](message);
        });
      });
    });
};
