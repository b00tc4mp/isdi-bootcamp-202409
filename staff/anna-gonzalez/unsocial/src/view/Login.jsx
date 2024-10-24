import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from '../components/library'

import logic from '../logic'

export default (props) => {
    console.log('Login -> render')

    return <main className="Login">
        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                logic.loginUser(username, password)

                form.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <h2>Login</h2>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" className="password-input" />
            </Field>
            <Button type="submit">Login</Button>
        </Form>
        <Anchor href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</Anchor>

    </main>
}