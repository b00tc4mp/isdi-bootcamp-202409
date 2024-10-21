import authenticateUser from '../logic/authenticateUser'

function Login(props) {
    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)
                console.error(error)
                event.target.password.value = ""
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username"></input>

            <label htmlFor="password">Password</label>
            <input type="password" id="password"></input>

            <button type="submit">Login</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </section>
}

export default Login