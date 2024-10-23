function logoutUser() {
    delete sessionStorage.loggedInUserId
}

export default logoutUser