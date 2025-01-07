import { getToken } from "../../utils/session";
// const { SystemError } = errors;

const validateSession = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = baseUrl + "/validate-session";
  const token = `Bearer ${getToken()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json",
        Authorization: token
       },
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    // alert(error);
    return error;
  }
  // return fetch(`http://${"localhost:8080"}/validate-session`, {
  //   method: "GET",
  //   headers: { "Content-type": "application/json", AUTHORIZATION: token },
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
  //           return response.data.status;
  //         });
  //     return false;
  //   });
};

export default validateSession;
