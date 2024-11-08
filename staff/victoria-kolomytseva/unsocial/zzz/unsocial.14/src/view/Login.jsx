import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../components/library/PasswordInput'

function Login(props) { //Un campo de entrada para la contraseña usando el componente PasswordInput.
    console.log('Login -> render')

    return <section>
        <h2>Login</h2>

        <form onSubmit={event => { //onSubmit), recoge los valores del formulario y llama a una función authenticateUser para validar al usuario.
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
            <div style={{ display: 'flex' }}>
                <input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />
            </div>

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