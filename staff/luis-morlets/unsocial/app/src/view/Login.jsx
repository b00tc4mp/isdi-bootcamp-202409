import { PasswordInput, Form, Field, Label, Button, Paragraph, Input } from '../components/library'

import logic from '../logic'

import './Login.css'

import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {

    console.log('Login -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            username: { value: username },
            password: { value: password }
        } = form

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                }
                form.reset()

                props.onLoggedIn()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterLink()
    }

    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="username">Username:</Label>
                <Input type="text" id="username" required={true} />
            </Field>

            <Field><Label htmlFor="password">Password:</Label>
                <PasswordInput id='password' />
            </Field>


            <Button type="submit" className="">Login</Button>
        </Form>

        <Paragraph className="">Don't have an account? <a href="" onClick={handleRegisterClick}>Register</a></Paragraph>
    </main>
}