import logic from '../logic'

import { Anchor, Form, Label, Input, Field, Button } from '../components/library'

import './Login.css'

export default props => {
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
            event.target.password.value = ""
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username"></Input>
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password"></Input>
            </Field>

            <Button type="submit" classname="login-button">Login</Button>
        </Form>
        <Anchor href="" onClick={handleRegisterClick}>Register</Anchor>
    </main>
}