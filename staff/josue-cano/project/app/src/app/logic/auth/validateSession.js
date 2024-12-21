import fetchHandler from "@/app/utils/handlers/fetchHandler";

// const { SystemError } = errors;
const validateSession = async () => {
  const url = "validate-session";

  try {
    const response = await fetchHandler(url, {});

    return response.data;
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
