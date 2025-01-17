function getLocations() {
  return fetch(`http://${"localhost:8080"}/datbase/locations`, {
    method: "get",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => error);
}

export { getLocations };
