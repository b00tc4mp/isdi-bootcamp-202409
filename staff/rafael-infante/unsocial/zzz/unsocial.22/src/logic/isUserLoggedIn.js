function isUserLoggedIn() {
  return sessionStorage.loggedUserId !== undefined
}

export default isUserLoggedIn