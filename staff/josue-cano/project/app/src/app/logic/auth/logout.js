export default () => {
  delete localStorage.token; // Elimina el token del localStorage
  window.location.href = "/"; // Redirige a la página de inicio
};
