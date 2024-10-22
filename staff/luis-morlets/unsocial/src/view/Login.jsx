import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../components/library/PasswordInput'

function Login(props) {
    return <section>
        <h2>Login</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                form.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id='password' />

            <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterLink()
        }}>Register</a></p>
    </section>
}

export default Login