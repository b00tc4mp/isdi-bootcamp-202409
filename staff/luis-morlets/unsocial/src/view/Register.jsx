import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'

function Register(props) {
    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: passwordRepeat }
            } = form

            try {
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegister()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <button type="submit">Register</button>
        </form>

        <p>Already have an account? <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginLink()
        }}>Login</a></p>
    </section>
}

export default Register