import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import logic from '../logic'

function Login(props) {
    console.log('Login -> render')

    return <main className="Login">
        <h2>Log in to Unsocial</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                logic.loginUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                // passwordInput.setValue('')
                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Log In</Button>
        </Form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Sign up</a>
    </main>
}

export default Login