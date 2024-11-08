import './Register.css'
import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'
import logic from '../logic'

function Register(props) {
    console.log('Register -> render')

    return <main className="Register">
        <h2>Register</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: passwordRepeat }
            } = form

            try {
                logic.registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegistered()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" />
            </Field>

            <Field>
                <label htmlFor="username">Username</label>
                <input type="text" />
            </Field>

            <Field>
                <label htmlFor="password">Password</label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <label htmlFor="password-repeat">Repeat Password</label>
                <PasswordInput id="password-repeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</a>
    </main>
}

export default Register