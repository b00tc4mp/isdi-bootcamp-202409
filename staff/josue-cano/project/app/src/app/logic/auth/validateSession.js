import { getToken } from "../../utils/session";

// const { SystemError } = errors;
const validateSession = () => {
  const token = `Bearer ${getToken()}`;
  console.log(token);
  return fetch(`http://${"localhost:8080"}/validate-session`, {
    method: "GET",
    headers: { "Content-type": "application/json", AUTHORIZATION: token },
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
            return response.status;
          });
      return false;
    });
};

export default validateSession;
