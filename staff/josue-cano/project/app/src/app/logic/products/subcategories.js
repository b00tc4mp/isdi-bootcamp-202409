export function fetchSubCategories() {
  return fetch(`http://${"localhost:8080"}/subcategorias`, {
    method: "get",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => error);
}
