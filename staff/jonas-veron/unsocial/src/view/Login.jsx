import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import logic from '../logic'


function Login(props) {
    console.log('Login -> render')

    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => {
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
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username"/>
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit" className="Button">Login</Button>
        </Form>
        <p>Don't you have a account ?</p>
        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </main>
}

export default Login