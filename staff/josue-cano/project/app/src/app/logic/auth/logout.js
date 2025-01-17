export default () => {
  delete localStorage.token;
  delete localStorage.favorites;
  window.location.href = '/';
}
