
import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import logic from '../logic'

export default props => { //Un campo de entrada para la contraseña usando el componente PasswordInput.
    console.log('Login -> render')

    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => { //onSubmit), recoge los valores del formulario y llama a una función authenticateUser para validar al usuario.
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event


            try {
                logic.loginUser(username, password)

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
    </main>
}
