function isUserLoggedIn() {
    return sessionStorage.loggedInUser !== undefined
}

export default isUserLoggedIn