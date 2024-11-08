import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'


function Login(props) { //Un campo de entrada para la contraseña usando el componente PasswordInput.
    console.log('Login -> render')

    return <section className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => { //onSubmit), recoge los valores del formulario y llama a una función authenticateUser para validar al usuario.
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
            <Field>
                <label htmlFor="username">Username</label>
                <Input type="text" id="username" />
            </Field>

            <Field>
                <label htmlFor="password">Password</label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </section>
}
export default Login