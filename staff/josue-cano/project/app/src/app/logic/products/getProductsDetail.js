import { getToken } from "@/app/utils/session";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getProductDetails(id) {

  const token = getToken();
  let url = "";

  const isPublic = token == undefined;

  if (isPublic) {
    url = `public/products/${id}`;
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
