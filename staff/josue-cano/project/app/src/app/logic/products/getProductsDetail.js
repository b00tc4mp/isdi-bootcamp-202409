import { getToken } from "@/app/utils/session";
import { validate } from "com";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getProductDetails(id) {
  validate.id(id);

  const token = getToken();
  let url = "";

  const isPublic = token == undefined;

  if (isPublic) {
    url = `products/public/${id}`;
  } else {
    url = `products/${id}`;
  }

  try {
    let response = await fetch(`${baseUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    response = await response.json();

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
