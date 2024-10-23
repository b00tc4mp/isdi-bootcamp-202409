import registerUser from '../logic/registerLogic'
import PasswordInput from '../components/library/PasswordInput'

function Register(props) {
    return <section className="section-container" id="register">
        <h2>REGISTER</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: repeatpassword }
            } } = event

            try {
                registerUser(name, email, username, password, repeatpassword)
                event.target.reset()

                props.onRegistered()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>
        <a href="" onClick={
            event => {
                event.preventDefault()

                props.onLoginClick()
            }}>Login</a>
    </section>
}
export default Register