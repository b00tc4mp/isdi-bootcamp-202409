import authenticateUser from '../logic/userLogic'
import PasswordInput from '../components/library/PasswordInput'

function Login(props) {
    return <section className="section-container">
        <h2>LOGIN</h2>

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
            }
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username"></input>

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <button type="submit">Login</button>
        </form>

        <h4>Don't have an account?</h4>
        <a href="" onClick={
            event => {
                event.preventDefault()
                props.onRegisterClick()
            }
        }>Register</a>

    </section>
}
export default Login