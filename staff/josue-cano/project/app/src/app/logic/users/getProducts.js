import { getToken } from "../../utils/session";

export async function getProducts() {
  const token = getToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let url = "users/products";

  url = `${baseUrl}/${url}`;

  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status == 401) {
        logout();
      }
      throw new Error(response.error);
    }
    response = await response.json();

    return response.data;
  } catch (error) {
    // alert(error);
    return error;
  }
}
