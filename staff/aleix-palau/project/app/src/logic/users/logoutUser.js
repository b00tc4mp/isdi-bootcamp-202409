export default () => {
    delete localStorage.token

    console.log('logoutUser.js: Dispatching authChange (loggedIn: false)');
    document.dispatchEvent(new CustomEvent('authChange', { detail: { loggedIn: false } }))
}