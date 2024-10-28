function logoutUser() {
  return delete sessionStorage.loggedUserId
}

export default logoutUser