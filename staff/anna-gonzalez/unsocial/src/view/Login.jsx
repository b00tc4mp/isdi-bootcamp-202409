import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from '../components/library'

import logic from '../logic'

export default (props) => {
    console.log('Login -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)

            event.target.reset()

            props.onLoggedIn()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="Login">
        <Form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>
            <Button type="submit">Login</Button>
        </Form>
        <Anchor href="" onClick={handleRegisterClick}>Register</Anchor>

    </main>
}