import { getToken } from "../../utils/session";
import fetchHandler from "@/app/utils/handlers/fetchHandler";

export async function getProductDetails(id) {
  debugger;

  const token = getToken();
  let url = "";

  const isPublic = token == undefined;

  if (isPublic) {
    url = `public/products/${id}`;
  } else {
    url = `products/${id}`;
  }

  try {
    const response = await fetchHandler(url, {}, isPublic);

    return response.data;
  } catch (error) {
    // alert(error);
    return error;
  }

  //
  // return fetch(`http://${"localhost:8080"}/products/${id}`, {
  //   method: "get",
  //   headers: { "Content-type": "application/json" },
  // })
  //   .then((response) => response.json())
  //   .then((response) => response.data)
  //   .catch((error) => error);
}
