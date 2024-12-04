import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

import useContext from './useContext'

export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            logic.loginUser(email, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
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

    return <main className="justify-self-center">
        <h2>Log in to Heartbeat</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput type="password" id="password" />
            </Field>

            <Button type="submit">Log In</Button>
        </Form>

        <a href="" onClick={handleRegisterClick}>Sign up</a>
    </main>
}