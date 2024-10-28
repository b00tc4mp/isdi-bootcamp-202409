import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../components/library/PasswordInput'

function Login(props) {
    console.log('Login -> render')

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
                //passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </section>
}

export default Login