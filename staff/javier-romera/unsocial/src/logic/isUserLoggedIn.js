function isUserLoggedIn() {
    return sessionStorage.loggedInUserId !== undefined
}

export default isUserLoggedIn