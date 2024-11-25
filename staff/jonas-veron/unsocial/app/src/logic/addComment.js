import { validate, errors } from "com";

const { SystemError } = errors;

export default (postId, text) => {
  validate.id(postId, "postId");
  validate.text(text, "text");

  return fetch(
    `http://${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
    {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({ text }),
    }
  )
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
