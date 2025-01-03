function isUserLoggedIn() {
    return sessionStorage.userId !== undefined
}

export default isUserLoggedIn