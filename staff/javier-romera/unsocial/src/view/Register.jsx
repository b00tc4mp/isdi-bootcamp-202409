import './Register.css'

import logic from '../logic'

import { Anchor, Form, Label, Input, Field, Button } from '../components/library'

function Register(props) {
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
                passwordRepeat: { value: passwordRepeat }
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
                <Input type="text" id="name"></Input>
            </Field>

            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email"></Input>
            </Field>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username"></Input>
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password"></Input>
            </Field>

            <Field>
                <Label htmlFor="passwordRepeat">Confirm password</Label>
                <Input type="password" id="passwordRepeat"></Input>
            </Field>

            <Button type="submit">Register</Button>
        </Form>
        <Anchor href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</Anchor>
    </main>
}

export default Register