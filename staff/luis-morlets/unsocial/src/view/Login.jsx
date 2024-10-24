import './Login.css'

import logic from '../logic'

import { PasswordInput, Form, Field, Label, Button, Paragraph, Input } from '../components/library'

function Login(props) {
    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                username: { value: username },
                password: { value: password }
            } = form

            try {
                logic.loginUser(username, password)

                form.reset()

                props.onLoggedIn()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="username">Username:</Label>
                <Input type="text" id="username" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />
            </Field>

            <Field><Label htmlFor="password">Password:</Label>
                <PasswordInput id='password' />
            </Field>


            <Button type="submit" className="">Login</Button>
        </Form>

        <Paragraph className="">Don't have an account? <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterLink()
        }}>Register</a></Paragraph>
    </main>
}

export default Login