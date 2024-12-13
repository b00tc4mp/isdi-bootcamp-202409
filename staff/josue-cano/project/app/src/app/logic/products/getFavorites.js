import { getToken } from "../../utils/session";

export function getFavorites() {
  const token = `Bearer ${getToken()}`;
  return fetch(`http://${"localhost:8080"}/favorites`, {
    method: "get",
    headers: { "Content-type": "application/json" , AUTHORIZATION: token },
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => error);
}
