import './Register.css'

import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from '../components/library'

import logic from '../logic'

export default (props) => {
    console.log('Register -> render')

    const handleSubmit = event => {
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
            logic.registerUser(name, email, username, password, passwordRepeat, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }
            })

            form.reset()

            props.onRegistered()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main className="Register">
        <Form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>
            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>
            <Field>
                <Label htmlFor="passwordRepeat">Confirm password</Label>
                <PasswordInput id="passwordRepeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>
        <Anchor href="" onClick={handleLoginClick}>Login</Anchor>
    </main>
}