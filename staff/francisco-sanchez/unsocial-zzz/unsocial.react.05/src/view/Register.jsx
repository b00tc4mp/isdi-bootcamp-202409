import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'

//Funcion register, que mostrará el formulario de registro
function Register(props) {
    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const {
                target: { username: { value: username },
                    password: { value: password },
                    name: { value: name },
                    email: { value: email },
                    passwordRepeat: { value: passwordRepeat } } } = event

            try {

                console.log(name)
                console.log(username)
                console.log(email)
                console.log(password)
                console.log(passwordRepeat)

                registerUser(name, email, username, password, passwordRepeat)
                event.target.reset()
                props.onRegisterClick()

            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="passwordRepeat">Repeat Password</label>
            <PasswordInput id="passwordRepeat" />

            <button type="submit">Register</button>
        </form>

        <a href=""
            onClick={event => {
                event.preventDefault()
                props.onLoginClick()
            }}>Login</a>

    </section>
}

export default Register