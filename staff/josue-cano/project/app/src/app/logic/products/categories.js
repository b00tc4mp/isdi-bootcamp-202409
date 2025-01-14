function fetchCategories() {
  return fetch(`http://${"localhost:8080"}/categories`, {
    method: "get",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => error);
}

export { fetchCategories };
