import { getToken } from "../../utils/session";

export function getProducts() {
  const token = getToken();
  let headers = { "Content-type": "application/json" }
  let url = `http://${"localhost:8080"}/`;


  if(token) {
    headers = { ...headers, AUTHORIZATION: `Bearer ${token}` }
    url = `${url}products`;
  } else {
    url = `${url}public/products`;
  }

  return fetch(`${url}`, {
    method: "get",
    headers: headers,
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => error);
}
