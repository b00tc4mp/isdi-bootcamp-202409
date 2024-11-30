import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import { errors } from '../../../com'

export default function Login(props) {
    console.log('Login -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            logic.loginUser(email, password, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Try again later.')
                else
                    alert(error.message)

                console.error(error)

                return
                }

                event.target.reset()

                props.onLoggedIn()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main>
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
        <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <Button onClick={handleRegisterClick}>Register</Button>

    </main>
}